package com.vendas_microservices.productapi.modules.supplier.dto;

public class SupplierRequest {
	
	private String name;

	public SupplierRequest() {
	}

	public SupplierRequest(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
