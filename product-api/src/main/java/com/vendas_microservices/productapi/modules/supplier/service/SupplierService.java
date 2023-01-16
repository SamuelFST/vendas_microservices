package com.vendas_microservices.productapi.modules.supplier.service;

import static org.springframework.util.ObjectUtils.isEmpty;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
	
	private void validateSupplierNameInformed(SupplierRequest request) {
		if (isEmpty(request.getName())) {
			throw new ValidationException("The supplier name was not informed");
		}
		if (supplierRepository.existsByName(request.getName())) {
			throw new ValidationException("A supplier with this name already exists");
		}
	}
	
	public Supplier findById(Integer id) {
		if (isEmpty(id)) {
			throw new ValidationException("The supplier id was not informed");
		}
		
		return supplierRepository.findById(id).orElseThrow(() -> new ValidationException("No supplier with id " +id));
	}
}
