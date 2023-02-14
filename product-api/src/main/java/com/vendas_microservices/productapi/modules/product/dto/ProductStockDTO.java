package com.vendas_microservices.productapi.modules.product.dto;

import java.util.List;

public class ProductStockDTO {

	private String salesId;
	private List<ProductQuantityDTO> products;
	private String transactionid;
	
	public ProductStockDTO() {
	}

	public ProductStockDTO(String salesId, List<ProductQuantityDTO> products, String transactionid) {
		this.salesId = salesId;
		this.products = products;
		this.transactionid = transactionid;
	}

	public String getSalesId() {
		return salesId;
	}

	public void setSalesId(String salesId) {
		this.salesId = salesId;
	}

	public List<ProductQuantityDTO> getProducts() {
		return products;
	}

	public void setProducts(List<ProductQuantityDTO> products) {
		this.products = products;
	}

	public String getTransactionid() {
		return transactionid;
	}

	public void setTransactionid(String transactionid) {
		this.transactionid = transactionid;
	}
}
