package com.vendas_microservices.productapi.modules.product.service;

import static org.springframework.util.ObjectUtils.isEmpty;
import static com.vendas_microservices.productapi.config.RequestUtil.getCurrentRequest;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vendas_microservices.productapi.config.SuccessResponse;
import com.vendas_microservices.productapi.config.exception.ValidationException;
import com.vendas_microservices.productapi.modules.category.model.Category;
import com.vendas_microservices.productapi.modules.category.service.CategoryService;
import com.vendas_microservices.productapi.modules.product.dto.ProductCheckStockRequest;
import com.vendas_microservices.productapi.modules.product.dto.ProductQuantityDTO;
import com.vendas_microservices.productapi.modules.product.dto.ProductRequest;
import com.vendas_microservices.productapi.modules.product.dto.ProductResponse;
import com.vendas_microservices.productapi.modules.product.dto.ProductSalesResponse;
import com.vendas_microservices.productapi.modules.product.dto.ProductStockDTO;
import com.vendas_microservices.productapi.modules.product.model.Product;
import com.vendas_microservices.productapi.modules.product.repository.ProductRepository;
import com.vendas_microservices.productapi.modules.sales.client.SalesClient;
import com.vendas_microservices.productapi.modules.sales.dto.SaleConfirmationDTO;
import com.vendas_microservices.productapi.modules.sales.dto.SalesProductListResponse;
import com.vendas_microservices.productapi.modules.sales.enums.SaleStatus;
import com.vendas_microservices.productapi.modules.sales.rabbitmq.SalesConfirmationSender;
import com.vendas_microservices.productapi.modules.supplier.model.Supplier;
import com.vendas_microservices.productapi.modules.supplier.service.SupplierService;

@Service
public class ProductService {
	
	private static final String SERVICE_ID = "serviceid";
	private static final String TRANSACTION_ID = "transactionid";
	
	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private SupplierService supplierService;
	@Autowired
	private CategoryService categoryService;
	@Autowired
	private SalesConfirmationSender salesConfirmationSender;
	@Autowired
	private SalesClient salesClient;
	@Autowired
	private ObjectMapper objectMapper;
	@PersistenceContext
	EntityManager entityManager;
	
	public List<ProductResponse> findAll(String name) {
		List<Product> products = new ArrayList<Product>();
		
		if (isEmpty(name)) {
			products.addAll(productRepository.findAll());
		} else {
			products.addAll(productRepository.findAllByNameLikeIgnoreCase("%"+ name +"%"));
		}
		
		return products
				.stream()
				.map(product -> ProductResponse.of(product))
				.collect(Collectors.toList());
	}
	
	public List<ProductResponse> findAllBySupplierId(Integer id) {
		if (isEmpty(id)) {
			throw new ValidationException("The product supplier id must be informed");
		}

		return productRepository
				.findAllBySupplierId(id)
				.stream()
				.map(product -> ProductResponse.of(product))
				.collect(Collectors.toList());
	}
	
	public List<ProductResponse> findAllByCategoryId(Integer id) {
		if (isEmpty(id)) {
			throw new ValidationException("The product category id must be informed");
		}
		
		return productRepository
				.findAllByCategoryId(id)
				.stream()
				.map(product -> ProductResponse.of(product))
				.collect(Collectors.toList());
	}
	
	
	public ProductResponse findByIdResponse(Integer id) {
		return ProductResponse.of(findById(id));
	}
	
	public ProductResponse save(ProductRequest request) {
		validateProductDataInformed(request);
		validateCategoryAndSupplierIdInformed(request);
		Category category = categoryService.findById(request.getCategoryId());
		Supplier supplier = supplierService.findById(request.getSupplierId());
		Product product = productRepository.save(Product.of(request, supplier, category));
		return ProductResponse.of(product);	
	}
	
	public ProductResponse update(ProductRequest request, Integer id) {
		validateProductDataInformed(request);
		validateInformedId(id);
		validateCategoryAndSupplierIdInformed(request);
		Category category = categoryService.findById(request.getCategoryId());
		Supplier supplier = supplierService.findById(request.getSupplierId());
		Product product = Product.of(request, supplier, category);
		product.setId(id);
		productRepository.save(product);
		return ProductResponse.of(product);
	}
	
	public SuccessResponse delete(Integer id) {
		validateInformedId(id);
		productRepository.deleteById(id);
		return SuccessResponse.create("The product with id "+id +" was deleted");
	}
	
	private void validateProductDataInformed(ProductRequest request) {
		if (isEmpty(request.getName())) {
			throw new ValidationException("The product name was not informed");
		}
		if (isEmpty(request.getQuantityAvailable())) {
			throw new ValidationException("The quantity available of product was not informed");
		}
		if (request.getQuantityAvailable() <= 0) {
			throw new ValidationException("The quantity available should not be less or equal to 0");
		}
	}
	
	private void validateCategoryAndSupplierIdInformed(ProductRequest request) {
		if (isEmpty(request.getCategoryId())) {
			throw new ValidationException("The category id was not informed");
		}
		if (isEmpty(request.getSupplierId())) {
			throw new ValidationException("The supplier id was not informed");
		}
	}
	
	private void validateInformedId(Integer id) {
		if (isEmpty(id)) {
			throw new ValidationException("The product id was not informed");
		}
	}
	
	public Product findById(Integer id) {
		validateInformedId(id);
		return productRepository.findById(id).orElseThrow(() -> new ValidationException("No product with id " +id));
	}
	
	public boolean existsByCategoryId(Integer id) {
		return productRepository.existsByCategoryId(id);
	}
	
	public boolean existsBySupplierId(Integer id) {
		return productRepository.existsBySupplierId(id);
	}
	
	@Transactional
	public void updateProductStock(ProductStockDTO product) {
		try {
			validateStockUpdateData(product);
			List<Product> productsForUpdate = new ArrayList<Product>();
			
			product
				.getProducts()
				.forEach(saleProduct -> {
					Product existingProduct = findById(saleProduct.getProductId());
					entityManager.detach(existingProduct);
					
					if (saleProduct.getQuantity() > existingProduct.getQuantityAvailable() 
							|| existingProduct.getQuantityAvailable() - saleProduct.getQuantity() < 0) {
						productsForUpdate.clear();
						throw new ValidationException(
							String.format("The product stock of id %s can't be updated or it's out of stock", existingProduct.getId())
						);
					}
					
					existingProduct.updateQuantity(saleProduct.getQuantity());
					productsForUpdate.add(existingProduct);
				});
			
			if (!isEmpty(productsForUpdate)) {
				productRepository.saveAll(productsForUpdate);
				
				SaleConfirmationDTO approvedMessage = new SaleConfirmationDTO(product.getSalesId(), SaleStatus.APPROVED, product.getTransactionid());
				salesConfirmationSender.sendSalesConfirmationMessage(approvedMessage);
			}
		} catch (Exception ex) {
			System.out.println("Error while trying to update stock for message: " +ex.getMessage());
			SaleConfirmationDTO rejectedMessage = new SaleConfirmationDTO(product.getSalesId(), SaleStatus.REJECTED, product.getTransactionid());
			salesConfirmationSender.sendSalesConfirmationMessage(rejectedMessage);
		}
	}
	
	private void validateStockUpdateData(ProductStockDTO productStockDTO) {
		if (isEmpty(productStockDTO) || isEmpty(productStockDTO.getSalesId())) {
			throw new ValidationException("The product data or sales id cannot be null");
		}
		if (isEmpty(productStockDTO.getProducts())) {
			throw new ValidationException("A sale must have at least 1 product to be processed");
		}
		
		productStockDTO
			.getProducts()
			.forEach(saleProduct -> {
				if (isEmpty(saleProduct.getQuantity()) || isEmpty(saleProduct.getProductId())) {
					throw new ValidationException("The product id and the quantity must be informed");
				}
			});
	}
	
	public ProductSalesResponse findAllSalesByProductId(Integer id) {
		Product product = findById(id);
		try {
			HttpServletRequest currentRequest = getCurrentRequest();
			String transactionid = currentRequest.getHeader(TRANSACTION_ID);
			Object serviceid = currentRequest.getAttribute(SERVICE_ID);
			
			System.out.printf(
					"Sending request to Sales-API find sales by product ID %s | [transactionID: %s | serviceID: %s]\n",
					id,
					transactionid,
					serviceid
			);
			
			SalesProductListResponse salesList = salesClient
					.findAllSalesByProductId(product.getId())
					.orElseThrow(() -> new ValidationException("No sales found for this product"));
			
			ProductSalesResponse response = ProductSalesResponse.of(product, salesList.getSalesIds());
			
			System.out.printf(
					"Success response from Sales-API find sales by product ID %s with data %s | [transactionID: %s | serviceID: %s]\n",
					id,
					objectMapper.writeValueAsString(response),
					transactionid,
					serviceid
			);
			
			return response;
		} catch (Exception ex) {
			ex.printStackTrace();
			throw new ValidationException("An error occurred when trying to get the product sales");
		}
	}
	
	public SuccessResponse checkProductsStock(ProductCheckStockRequest request) {
		try {
			HttpServletRequest currentRequest = getCurrentRequest();
			String transactionid = currentRequest.getHeader(TRANSACTION_ID);
			Object serviceid = currentRequest.getAttribute(SERVICE_ID);
			
			System.out.printf(
					"Request to POST on check products stock with data %s | [transactionID: %s | serviceID: %s]\n",
					new ObjectMapper().writeValueAsString(request),
					transactionid,
					serviceid
					);
			
			if (isEmpty(request) || isEmpty(request.getProducts())) {
				throw new ValidationException("The products list must not be empty");
			}
			
			request
			.getProducts()
			.forEach(this::validateStock);
			
			SuccessResponse response = SuccessResponse.create("All the products in the given list have available stock");
			
			System.out.printf(
					"Response to POST on check products stock with data %s | [transactionID: %s | serviceID: %s]\n",
					new ObjectMapper().writeValueAsString(response),
					transactionid,
					serviceid
					);
			
			return response;

		} catch (Exception ex) {
			throw new ValidationException(ex.getMessage());
		}
	}
	
	private void validateStock(ProductQuantityDTO productQuantity) {
		if (isEmpty(productQuantity.getProductId()) || isEmpty(productQuantity.getQuantity())) {
			throw new ValidationException("The product id and quantity must be informed for all products in the list");
		}
		
		Product product = findById(productQuantity.getProductId());
		
		if (productQuantity.getQuantity() > product.getQuantityAvailable()) {
			throw new ValidationException(String.format("The product %s is out of stock", product.getId()));
		}
	}
}
