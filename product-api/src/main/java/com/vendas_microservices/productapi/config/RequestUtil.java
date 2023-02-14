package com.vendas_microservices.productapi.config;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.vendas_microservices.productapi.config.exception.ValidationException;

public class RequestUtil {
	public static HttpServletRequest getCurrentRequest() {
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
