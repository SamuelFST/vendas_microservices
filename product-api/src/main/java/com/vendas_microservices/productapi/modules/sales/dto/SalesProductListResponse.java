package com.vendas_microservices.productapi.modules.sales.dto;

import java.util.List;

public class SalesProductListResponse {

	private List<String> salesIds;

	public SalesProductListResponse() {
	}

	public SalesProductListResponse(List<String> salesIds) {
		this.salesIds = salesIds;
	}

	public List<String> getSalesIds() {
		return salesIds;
	}

	public void setSalesIds(List<String> salesIds) {
		this.salesIds = salesIds;
	}
}
