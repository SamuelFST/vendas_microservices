package com.vendas_microservices.productapi.modules.supplier.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vendas_microservices.productapi.modules.supplier.dto.SupplierRequest;
import com.vendas_microservices.productapi.modules.supplier.dto.SupplierResponse;
import com.vendas_microservices.productapi.modules.supplier.service.SupplierService;

@RestController
@RequestMapping("/api/suppliers")
public class SupplierController {
	
	@Autowired
	private SupplierService supplierService;
	
	@GetMapping("")
	public List<SupplierResponse> findAll(@RequestParam(required = false) String name) {
		return supplierService.findAll(name);
	}
	
	@GetMapping("/{id}")
	public SupplierResponse findById(@PathVariable Integer id) {
		return supplierService.findByIdResponse(id);
	}
	
	@PostMapping("")
	public SupplierResponse save(@RequestBody SupplierRequest request) {
		return supplierService.save(request);
	}
}
