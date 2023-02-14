package com.vendas_microservices.productapi.config.interceptor;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Component;

import feign.RequestInterceptor;
import feign.RequestTemplate;

import static com.vendas_microservices.productapi.config.RequestUtil.getCurrentRequest;

@Component
public class FeignClientAuthInterceptor implements RequestInterceptor {
	
	private static final String AUTHORIZATION = "Authorization";
	private static final String TRANSACTION_ID = "transactionid";
	
	@Override
	public void apply(RequestTemplate template) {
		HttpServletRequest currentRequest = getCurrentRequest();
		
		template
			.header(AUTHORIZATION, currentRequest.getHeader(AUTHORIZATION))
			.header(TRANSACTION_ID, currentRequest.getHeader(TRANSACTION_ID));
	}
}
