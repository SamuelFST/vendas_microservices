package com.vendas_microservices.productapi.modules.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vendas_microservices.productapi.modules.product.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
	boolean existsByDescription(String description);
}
