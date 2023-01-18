package com.vendas_microservices.productapi.config;

import org.springframework.http.HttpStatus;

public class SuccessResponse {

	private Integer status;
	private String message;
	
	public SuccessResponse() {
	}

	public SuccessResponse(Integer status, String message) {
		this.status = status;
		this.message = message;
	}

	public static SuccessResponse create(String message) {
		SuccessResponse response = new SuccessResponse();
		response.setStatus(HttpStatus.OK.value());
		response.setMessage(message);
		
		return response; 
	}
	
	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
