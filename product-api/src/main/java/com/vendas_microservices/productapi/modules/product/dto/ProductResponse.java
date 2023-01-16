package com.vendas_microservices.productapi.modules.product.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.vendas_microservices.productapi.modules.category.dto.CategoryResponse;
import com.vendas_microservices.productapi.modules.product.model.Product;
import com.vendas_microservices.productapi.modules.supplier.dto.SupplierResponse;

public class ProductResponse {

	private Integer id;
	private String name;
	@JsonProperty("quantity_available")
	private Integer quantityAvailable;
	private SupplierResponse supplier;
	private CategoryResponse category;
	@JsonProperty("created_at")
	@JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
	private LocalDateTime createdAt;
		
	public ProductResponse() {
	}

	public ProductResponse(Integer id, String name, Integer quantityAvailable, SupplierResponse supplier, CategoryResponse category, LocalDateTime createdAt) {
		this.id = id;
		this.name = name;
		this.quantityAvailable = quantityAvailable;
		this.supplier = supplier;
		this.category = category;
		this.createdAt = createdAt;
	}
	
	public static ProductResponse of(Product product) {
		ProductResponse response = new ProductResponse();
		response.setId(product.getId());
		response.setName(product.getName());
		response.setQuantityAvailable(product.getQuantityAvailable());
		response.setCreatedAt(product.getCreatedAt());
		response.setSupplier(SupplierResponse.of(product.getSupplier()));
		response.setCategory(CategoryResponse.of(product.getCategory()));
		return response;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public Integer getQuantityAvailable() {
		return quantityAvailable;
	}

	public void setQuantityAvailable(Integer quantityAvailable) {
		this.quantityAvailable = quantityAvailable;
	}

	public SupplierResponse getSupplier() {
		return supplier;
	}

	public void setSupplier(SupplierResponse supplier) {
		this.supplier = supplier;
	}

	public CategoryResponse getCategory() {
		return category;
	}

	public void setCategory(CategoryResponse category) {
		this.category = category;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
}
