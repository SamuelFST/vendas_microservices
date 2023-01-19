package com.vendas_microservices.productapi.modules.jwt.service;

import static org.springframework.util.ObjectUtils.isEmpty;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.vendas_microservices.productapi.config.exception.AuthenticationException;
import com.vendas_microservices.productapi.modules.jwt.dto.JwtResponse;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
		
	@Value("${app-config.secrets.SECRET_KEY}")
	private String apiSecret;
	
	public void validateAuthorization(String token) {
		String accessToken = extractToken(token);
		try {
			Claims claims = Jwts
					.parserBuilder()
					.setSigningKey(Keys.hmacShaKeyFor(apiSecret.getBytes()))
					.build()
					.parseClaimsJws(accessToken)
					.getBody();
			
			JwtResponse user = JwtResponse.getUser(claims);
			
			if (isEmpty(user) || isEmpty(user.getId())) {
				throw new AuthenticationException("Invalid token");
			}
		} catch (Exception ex) {
			ex.printStackTrace();
			throw new AuthenticationException("Error while trying to proccess the informed access token");
		}
	}
	
	private String extractToken(String token ) {
		if (isEmpty(token)) {
			throw new AuthenticationException("Access token was not informed");
		}
		if (token.contains(" ")) {
			return token.split(" ")[1];
		}
		
		return token;
	}
}
