package com.vendas_microservices.productapi.modules.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vendas_microservices.productapi.modules.product.model.Supplier;

public interface SupplierRepository extends JpaRepository<Supplier, Integer> {

}
