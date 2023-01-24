package com.vendas_microservices.productapi.modules.product.dto;

import java.util.List;

public class ProductCheckStockRequest {
	
	List<ProductQuantityDTO> products;

	public ProductCheckStockRequest() {
	}

	public ProductCheckStockRequest(List<ProductQuantityDTO> products) {
		this.products = products;
	}

	public List<ProductQuantityDTO> getProducts() {
		return products;
	}

	public void setProducts(List<ProductQuantityDTO> products) {
		this.products = products;
	}
}
