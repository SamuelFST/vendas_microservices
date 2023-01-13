package com.vendas_microservices.productapi.modules.category.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vendas_microservices.productapi.config.exception.ValidationException;
import com.vendas_microservices.productapi.modules.category.model.Category;
import com.vendas_microservices.productapi.modules.category.repository.CategoryRepository;
import com.vendas_microservices.productapi.modules.category.dto.CategoryRequest;
import com.vendas_microservices.productapi.modules.category.dto.CategoryResponse;

import static org.springframework.util.ObjectUtils.isEmpty;

@Service
public class CategoryService {

	@Autowired
	private CategoryRepository categoryRepository;
	
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
}
