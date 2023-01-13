package com.vendas_microservices.productapi.modules.supplier.dto;

import org.springframework.beans.BeanUtils;

import com.vendas_microservices.productapi.modules.supplier.model.Supplier;

public class SupplierResponse {
	
	private Integer id;
	private String name;
		
	public SupplierResponse() {
	}

	public SupplierResponse(Integer id, String name) {
		this.id = id;
		this.name = name;
	}

	public static SupplierResponse of(Supplier supplier) {
		SupplierResponse response = new SupplierResponse();
		BeanUtils.copyProperties(supplier, response);
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
}
