package com.vendas_microservices.productapi.modules.supplier.service;

import static org.springframework.util.ObjectUtils.isEmpty;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vendas_microservices.productapi.config.exception.ValidationException;
import com.vendas_microservices.productapi.modules.supplier.dto.SupplierRequest;
import com.vendas_microservices.productapi.modules.supplier.dto.SupplierResponse;
import com.vendas_microservices.productapi.modules.supplier.model.Supplier;
import com.vendas_microservices.productapi.modules.supplier.repository.SupplierRepository;

@Service
public class SupplierService {
	
	@Autowired
	private SupplierRepository supplierRepository;
	
	public SupplierResponse save(SupplierRequest request) {
		validateSupplierNameInformed(request);
		Supplier supplier = supplierRepository.save(Supplier.of(request));
		return SupplierResponse.of(supplier);
	}
	
	private void validateSupplierNameInformed(SupplierRequest request) {
		if (isEmpty(request.getName())) {
			throw new ValidationException("The supplier name was not informed");
		}
		if (supplierRepository.existsByName(request.getName())) {
			throw new ValidationException("A supplier with this name already exists");
		}
	}
}
