package com.vendas_microservices.productapi.modules.product.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vendas_microservices.productapi.config.exception.ValidationException;
import com.vendas_microservices.productapi.modules.product.dto.CategoryRequest;
import com.vendas_microservices.productapi.modules.product.dto.CategoryResponse;
import com.vendas_microservices.productapi.modules.product.model.Category;
import com.vendas_microservices.productapi.modules.product.repository.CategoryRepository;

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
