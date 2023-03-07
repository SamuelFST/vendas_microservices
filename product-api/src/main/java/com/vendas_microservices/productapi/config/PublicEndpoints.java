package com.vendas_microservices.productapi.config;

public enum PublicEndpoints {
	API_STATUS("/api/status");
	private final String publicEndpoint;
	
	PublicEndpoints(String publicEndpoint) {
		this.publicEndpoint = publicEndpoint;
	}

	public String getPublicEndpoint() {
		return publicEndpoint;
	}
}
