package com.vendas_microservices.productapi.modules.product.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vendas_microservices.productapi.modules.product.model.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
	List<Product> findAllByNameLikeIgnoreCase(String name);
	List<Product> findAllByCategoryId(Integer id);
	List<Product> findAllBySupplierId(Integer id);
	boolean existsByCategoryId(Integer id);
	boolean existsBySupplierId(Integer id);
}
