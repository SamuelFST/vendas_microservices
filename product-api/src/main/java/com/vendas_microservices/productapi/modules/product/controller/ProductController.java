package com.vendas_microservices.productapi.modules.product.controller;

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
import com.vendas_microservices.productapi.modules.product.dto.ProductRequest;
import com.vendas_microservices.productapi.modules.product.dto.ProductResponse;
import com.vendas_microservices.productapi.modules.product.service.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductController {

	@Autowired
	private ProductService productService;
	
	@GetMapping("")
	public List<ProductResponse> findAll(@RequestParam(required = false) String name) {
		return productService.findAll(name);
	}
	
	@GetMapping("/{id}")
	public ProductResponse findById(@PathVariable Integer id) {
		return productService.findByIdResponse(id);
	}
	
	@GetMapping("/category/{id}")
	public List<ProductResponse> findAllByCategoryId(@PathVariable Integer id) {
		return productService.findAllByCategoryId(id);
	}
	
	@GetMapping("/supplier/{id}")
	public List<ProductResponse> findAllBySupplierId(@PathVariable Integer id) {
		return productService.findAllBySupplierId(id);
	}
	
	@PostMapping("")
	public ProductResponse save(@RequestBody ProductRequest request) {
		return productService.save(request);
	}
	
	@PutMapping("/{id}")
	public ProductResponse update(@RequestBody ProductRequest request, @PathVariable Integer id) {
		return productService.update(request, id);
	}
	
	@DeleteMapping("/{id}")
	public SuccessResponse delete(@PathVariable Integer id) {
		return productService.delete(id);
	}
}
