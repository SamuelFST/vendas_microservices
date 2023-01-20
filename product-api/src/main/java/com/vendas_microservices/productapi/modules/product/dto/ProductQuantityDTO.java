package com.vendas_microservices.productapi.modules.product.dto;

public class ProductQuantityDTO {

	private Integer productId;
	private Integer quantity;
	
	public ProductQuantityDTO() {
	}
	
	public ProductQuantityDTO(Integer productId, Integer quantity) {
		this.productId = productId;
		this.quantity = quantity;
	}

	public Integer getProductId() {
		return productId;
	}

	public void setProductId(Integer productId) {
		this.productId = productId;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
}
