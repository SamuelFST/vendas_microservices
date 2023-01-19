package com.vendas_microservices.productapi.modules.jwt.dto;

import io.jsonwebtoken.Claims;

public class JwtResponse {

	private Integer id;
	private String name;
	private String email;
	
	public JwtResponse() {
	}

	public JwtResponse(Integer id, String name, String email) {
		this.id = id;
		this.name = name;
		this.email = email;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	public static JwtResponse getUser(Claims jwtClaims) {
		try {
			JwtResponse response = new JwtResponse();
			response.setId((Integer) jwtClaims.get("id"));
			response.setName((String) jwtClaims.get("name"));
			response.setEmail((String) jwtClaims.get("email"));
			
			return response;
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}
}
