package com.vendas_microservices.productapi.modules.supplier.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vendas_microservices.productapi.config.SuccessResponse;
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
	
	@PutMapping("/{id}")
	public SupplierResponse update(@RequestBody SupplierRequest request, @PathVariable Integer id) {
		return supplierService.update(request, id);
	}
	
	@DeleteMapping("/{id}")
	public SuccessResponse delete(@PathVariable Integer id) {
		return supplierService.delete(id);
	}
}
