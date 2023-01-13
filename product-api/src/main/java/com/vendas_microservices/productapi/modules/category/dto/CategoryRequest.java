package com.vendas_microservices.productapi.modules.category.dto;

public class CategoryRequest {
	
	private String description;

	public CategoryRequest() {
	}

	public CategoryRequest(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}
