package com.vendas_microservices.productapi.modules.category.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vendas_microservices.productapi.modules.category.service.CategoryService;
import com.vendas_microservices.productapi.modules.category.dto.CategoryRequest;
import com.vendas_microservices.productapi.modules.category.dto.CategoryResponse;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

	@Autowired
	private CategoryService categoryService;
	
	@GetMapping("")
	public List<CategoryResponse> findAll(@RequestParam(required = false) String description) {
		return categoryService.findAll(description);
	}
	
	@GetMapping("/{id}")
	public CategoryResponse findById(@PathVariable Integer id) {
		return categoryService.findByIdResponse(id);
	}
	
	@PostMapping("")
	public CategoryResponse save(@RequestBody CategoryRequest request) {
		return categoryService.save(request);
	}
}
