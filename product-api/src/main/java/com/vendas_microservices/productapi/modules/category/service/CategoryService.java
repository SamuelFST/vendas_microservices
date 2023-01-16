package com.vendas_microservices.productapi.modules.category.service;

import static org.springframework.util.ObjectUtils.isEmpty;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vendas_microservices.productapi.config.exception.ValidationException;
import com.vendas_microservices.productapi.modules.category.dto.CategoryRequest;
import com.vendas_microservices.productapi.modules.category.dto.CategoryResponse;
import com.vendas_microservices.productapi.modules.category.model.Category;
import com.vendas_microservices.productapi.modules.category.repository.CategoryRepository;

@Service
public class CategoryService {

	@Autowired
	private CategoryRepository categoryRepository;
	
	public List<CategoryResponse> findAll(String description) {
		List<Category> categories = new ArrayList<Category>();
		
		if (isEmpty(description)) {
			categories.addAll(categoryRepository.findAll());
		} else {
			categories.addAll(categoryRepository.findAllByDescriptionLikeIgnoreCase("%"+ description +"%"));
		}
		
		return categories
				.stream()
				.map(category -> CategoryResponse.of(category))
				.collect(Collectors.toList());
	}
	
	public CategoryResponse findByIdResponse(Integer id) {
		return CategoryResponse.of(findById(id));
	}
	
	public CategoryResponse save(CategoryRequest request) {
		validateCategoryNameInformed(request);
		Category category = categoryRepository.save(Category.of(request));
		return CategoryResponse.of(category);
	}
	
	private void validateCategoryNameInformed(CategoryRequest request) {
		if (isEmpty(request.getDescription())) {
			throw new ValidationException("The category description was not informed");
		}
		if (categoryRepository.existsByDescription(request.getDescription())) {
			throw new ValidationException("The category informed already exists");
		}
	}
	
	public Category findById(Integer id) {
		if (isEmpty(id)) {
			throw new ValidationException("The category id was not informed");
		}
		
		return categoryRepository.findById(id).orElseThrow(() -> new ValidationException("No category with id " +id));
	}
}
