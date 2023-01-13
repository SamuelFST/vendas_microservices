package com.vendas_microservices.productapi.modules.category.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vendas_microservices.productapi.modules.category.service.CategoryService;
import com.vendas_microservices.productapi.modules.category.dto.CategoryRequest;
import com.vendas_microservices.productapi.modules.category.dto.CategoryResponse;

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
