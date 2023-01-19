package com.vendas_microservices.productapi.config.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import com.vendas_microservices.productapi.modules.jwt.service.JwtService;

public class AuthInterceptor implements HandlerInterceptor {
	
	private static final String AUTHORIZATION = "Authorization";
	
	@Autowired
	private JwtService jwtService;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		if (isOptions(request)) {
			return true;
		}
		
		String authorization = request.getHeader(AUTHORIZATION);
		jwtService.validateAuthorization(authorization);
		
		return true;
	}
	
	private boolean isOptions(HttpServletRequest request) {
		return HttpMethod.OPTIONS.name().equals(request.getMethod());
	}
}
