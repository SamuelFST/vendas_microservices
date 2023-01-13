package com.vendas_microservices.productapi.modules.supplier.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vendas_microservices.productapi.modules.supplier.dto.SupplierRequest;
import com.vendas_microservices.productapi.modules.supplier.dto.SupplierResponse;
import com.vendas_microservices.productapi.modules.supplier.service.SupplierService;

@RestController
@RequestMapping("/api/suppliers")
public class SupplierController {
	
	@Autowired
	private SupplierService supplierService;
	
	@PostMapping("")
	public SupplierResponse save(@RequestBody SupplierRequest request) {
		return supplierService.save(request);
	}
}
