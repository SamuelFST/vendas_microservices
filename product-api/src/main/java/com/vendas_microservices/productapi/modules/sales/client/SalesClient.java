package com.vendas_microservices.productapi.modules.sales.client;

import java.util.Optional;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.vendas_microservices.productapi.modules.sales.dto.SalesProductListResponse;

@FeignClient(
	name = "salesClient",
	contextId = "salesClient",
	url = "${app-config.services.sales}"
)
public interface SalesClient {

	@GetMapping("/api/orders/products/{id}")
	Optional<SalesProductListResponse> findAllSalesByProductId(@PathVariable(value = "id") Integer id);
}
