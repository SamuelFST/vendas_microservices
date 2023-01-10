package com.vendas_microservices.productapi.modules.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vendas_microservices.productapi.modules.product.model.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {

}
