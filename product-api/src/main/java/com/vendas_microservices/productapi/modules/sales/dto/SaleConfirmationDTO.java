package com.vendas_microservices.productapi.modules.sales.dto;

import com.vendas_microservices.productapi.modules.sales.enums.SaleStatus;

public class SaleConfirmationDTO {

	private String salesId;
	private SaleStatus status;
	
	public SaleConfirmationDTO() {
	}

	public SaleConfirmationDTO(String salesId, SaleStatus status) {
		this.salesId = salesId;
		this.status = status;
	}

	public String getSalesId() {
		return salesId;
	}

	public void setSalesId(String salesId) {
		this.salesId = salesId;
	}

	public SaleStatus getStatus() {
		return status;
	}

	public void setStatus(SaleStatus status) {
		this.status = status;
	}
}
