package com.vendas_microservices.productapi.config.interceptor;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.vendas_microservices.productapi.config.exception.ValidationException;

import feign.RequestInterceptor;
import feign.RequestTemplate;

public class FeignClientAuthInterceptor implements RequestInterceptor {
	
	@Override
	public void apply(RequestTemplate template) {
		HttpServletRequest currentRequest = getCurrentRequest();
		
		template.header("Authorization", currentRequest.getHeader("Authorization"));
	}
	
	private HttpServletRequest getCurrentRequest() {
		try {
			return ((ServletRequestAttributes) RequestContextHolder
					.getRequestAttributes())
					.getRequest();
		} catch (Exception ex) {
			ex.printStackTrace();
			throw new ValidationException("The current request could not be processed");
		}
	}
}
