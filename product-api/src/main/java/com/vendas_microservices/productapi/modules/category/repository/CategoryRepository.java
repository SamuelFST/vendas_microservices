package com.vendas_microservices.productapi.modules.category.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vendas_microservices.productapi.modules.category.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
	boolean existsByDescription(String description);
	List<Category> findAllByDescriptionLikeIgnoreCase(String description);
}
