package com.vendas_microservices.productapi.modules.product.service;

import static org.springframework.util.ObjectUtils.isEmpty;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vendas_microservices.productapi.config.exception.ValidationException;
import com.vendas_microservices.productapi.modules.category.model.Category;
import com.vendas_microservices.productapi.modules.category.service.CategoryService;
import com.vendas_microservices.productapi.modules.product.dto.ProductRequest;
import com.vendas_microservices.productapi.modules.product.dto.ProductResponse;
import com.vendas_microservices.productapi.modules.product.model.Product;
import com.vendas_microservices.productapi.modules.product.repository.ProductRepository;
import com.vendas_microservices.productapi.modules.supplier.model.Supplier;
import com.vendas_microservices.productapi.modules.supplier.service.SupplierService;

@Service
public class ProductService {
	
	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private SupplierService supplierService;
	@Autowired
	private CategoryService categoryService;
	
	public ProductResponse save(ProductRequest request) {
		validateProductDataInformed(request);
		validateCategoryAndSupplierIdInformed(request);
		Category category = categoryService.findById(request.getCategoryId());
		Supplier supplier = supplierService.findById(request.getSupplierId());
		Product product = productRepository.save(Product.of(request, supplier, category));
		return ProductResponse.of(product);	
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
}
