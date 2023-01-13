package com.vendas_microservices.productapi.modules.category.dto;

import org.springframework.beans.BeanUtils;

import com.vendas_microservices.productapi.modules.category.model.Category;

public class CategoryResponse {
	
	private Integer id;
	private String description;
		
	public CategoryResponse() {
		super();
	}

	public CategoryResponse(Integer id, String description) {
		super();
		this.id = id;
		this.description = description;
	}

	public static CategoryResponse of(Category category) {
		CategoryResponse response = new CategoryResponse();
		BeanUtils.copyProperties(category, response);
		return response;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}
