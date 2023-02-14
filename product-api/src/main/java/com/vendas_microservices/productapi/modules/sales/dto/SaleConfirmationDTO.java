package com.vendas_microservices.productapi.modules.sales.dto;

import com.vendas_microservices.productapi.modules.sales.enums.SaleStatus;

public class SaleConfirmationDTO {

	private String salesId;
	private SaleStatus status;
	private String transactionid;
	
	public SaleConfirmationDTO() {
	}

	public SaleConfirmationDTO(String salesId, SaleStatus status, String transactionid) {
		this.salesId = salesId;
		this.status = status;
		this.transactionid = transactionid;
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

	public String getTransactionid() {
		return transactionid;
	}

	public void setTransactionid(String transactionid) {
		this.transactionid = transactionid;
	}
}
