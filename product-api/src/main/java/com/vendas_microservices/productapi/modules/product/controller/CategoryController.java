package com.vendas_microservices.productapi.modules.product.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vendas_microservices.productapi.modules.product.dto.CategoryRequest;
import com.vendas_microservices.productapi.modules.product.dto.CategoryResponse;
import com.vendas_microservices.productapi.modules.product.service.CategoryService;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

	@Autowired
	private CategoryService categoryService;
	
	@PostMapping("")
	public CategoryResponse save(@RequestBody CategoryRequest request) {
		return categoryService.save(request);
	}
}
