package com.vendas_microservices.productapi.modules.sales.rabbitmq;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vendas_microservices.productapi.modules.sales.dto.SaleConfirmationDTO;

@Component
public class SalesConfirmationSender {

	@Autowired
	private RabbitTemplate rabbitTemplate;
	
	@Value("${app-config.rabbit.exchange.product}")
	private String productTopicExchange;
	
	@Value("${app-config.rabbit.routingKey.sales-confirmation}")
	private String salesConfirmationRoutingKey;
	
	public void sendSalesConfirmationMessage(SaleConfirmationDTO message) {
		try {
			System.out.println("Sending message: " + new ObjectMapper().writeValueAsString(message));
			rabbitTemplate.convertAndSend(productTopicExchange, salesConfirmationRoutingKey, message);
			System.out.println("Message sent successfully!");
		} catch (Exception ex) {
			System.out.println("Error while trying to send sales confirmation message: " +ex);
		}
	}
}
