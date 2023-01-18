package com.vendas_microservices.productapi.modules.supplier.service;

import static org.springframework.util.ObjectUtils.isEmpty;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vendas_microservices.productapi.config.SuccessResponse;
import com.vendas_microservices.productapi.config.exception.ValidationException;
import com.vendas_microservices.productapi.modules.product.service.ProductService;
import com.vendas_microservices.productapi.modules.supplier.dto.SupplierRequest;
import com.vendas_microservices.productapi.modules.supplier.dto.SupplierResponse;
import com.vendas_microservices.productapi.modules.supplier.model.Supplier;
import com.vendas_microservices.productapi.modules.supplier.repository.SupplierRepository;

@Service
public class SupplierService {
	
	@Autowired
	private SupplierRepository supplierRepository;
	@Autowired
	private ProductService productService;
	
	public List<SupplierResponse> findAll(String name) {
		List<Supplier> suppliers = new ArrayList<Supplier>();
		
		if (isEmpty(name)) {
			suppliers.addAll(supplierRepository.findAll());
		} else {
			suppliers.addAll(supplierRepository.findAllByNameLikeIgnoreCase("%"+ name +"%"));
		}
		
		return suppliers
				.stream()
				.map(supplier -> SupplierResponse.of(supplier))
				.collect(Collectors.toList());
	}
	
	public SupplierResponse findByIdResponse(Integer id) {
		return SupplierResponse.of(findById(id));
	}
	
	public SupplierResponse save(SupplierRequest request) {
		validateSupplierNameInformed(request);
		Supplier supplier = supplierRepository.save(Supplier.of(request));
		return SupplierResponse.of(supplier);
	}
	
	public SupplierResponse update(SupplierRequest request, Integer id) {
		validateSupplierNameInformed(request);
		validateInformedId(id);
		Supplier supplier = Supplier.of(request);
		supplier.setId(id);
		supplierRepository.save(supplier);
		return SupplierResponse.of(supplier);
	}
	
	public SuccessResponse delete(Integer id) {
		validateInformedId(id);
		
		if (productService.existsBySupplierId(id)) {
			throw new ValidationException("Cannot delete this supplier because it is already used by a product");
		}
		
		supplierRepository.deleteById(id);
		return SuccessResponse.create("The supplier with id "+id +" was deleted");
	}
	
	private void validateSupplierNameInformed(SupplierRequest request) {
		if (isEmpty(request.getName())) {
			throw new ValidationException("The supplier name was not informed");
		}
		if (supplierRepository.existsByName(request.getName())) {
			throw new ValidationException("A supplier with this name already exists");
		}
	}
	
	private void validateInformedId(Integer id) {
		if (isEmpty(id)) {
			throw new ValidationException("The supplier id was not informed");
		}
	}
	
	public Supplier findById(Integer id) {
		validateInformedId(id);
		return supplierRepository.findById(id).orElseThrow(() -> new ValidationException("No supplier with id " +id));
	}
}
