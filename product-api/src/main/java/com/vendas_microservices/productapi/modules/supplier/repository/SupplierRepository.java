package com.vendas_microservices.productapi.modules.supplier.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vendas_microservices.productapi.modules.supplier.model.Supplier;

public interface SupplierRepository extends JpaRepository<Supplier, Integer> {
	boolean existsByName(String name);
	List<Supplier> findAllByNameLikeIgnoreCase(String name);
}
