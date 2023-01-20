package com.vendas_microservices.productapi.modules.product.rabbitmq;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vendas_microservices.productapi.modules.product.dto.ProductStockDTO;
import com.vendas_microservices.productapi.modules.product.service.ProductService;

@Component
public class ProductStockListener {

	@Autowired
	private ProductService productService;
	
	@RabbitListener(queues = "${app-config.rabbit.queue.product-stock}")
	public void receiveProductStockMessage(ProductStockDTO product) {
		try {
			System.out.println("Receiving message: " + new ObjectMapper().writeValueAsString(product));
			productService.updateProductStock(product);
		} catch (Exception ex) {
			System.out.println("Error while receiving message: " +ex);
		}
		
	}
}
