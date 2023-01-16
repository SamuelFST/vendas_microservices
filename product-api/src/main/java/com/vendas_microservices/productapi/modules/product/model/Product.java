package com.vendas_microservices.productapi.modules.product.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;

import com.vendas_microservices.productapi.modules.category.model.Category;
import com.vendas_microservices.productapi.modules.product.dto.ProductRequest;
import com.vendas_microservices.productapi.modules.supplier.model.Supplier;

@Entity
@Table(name = "products")
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Integer id;
	
	@Column(name = "name", nullable = false)
	private String name;
	
	@Column(name = "quantity_available", nullable = false)
	private Integer quantityAvailable;

	@ManyToOne
	@JoinColumn(name = "supplier_id", nullable = false)
	private Supplier supplier;
	
	@ManyToOne
	@JoinColumn(name = "category_id", nullable = false)
	private Category category;

	@Column(name = "created_at", nullable = false, updatable = false)
	private LocalDateTime createdAt;
	
	@PrePersist
	public void prePersist() {
		createdAt = LocalDateTime.now();
	}
	
	public Product() {
	}

	public Product(Integer id, String name, Integer quantityAvailable, Supplier supplier, Category category) {
		this.id = id;
		this.name = name;
		this.quantityAvailable = quantityAvailable;
		this.supplier = supplier;
		this.category = category;
	}
	
	public static Product of(ProductRequest request, Supplier supplier, Category category) {
		Product product = new Product();
		product.setName(request.getName());
		product.setQuantityAvailable(request.getQuantityAvailable());
		product.setSupplier(supplier);
		product.setCategory(category);
		return product;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getQuantityAvailable() {
		return quantityAvailable;
	}

	public void setQuantityAvailable(Integer quantityAvailable) {
		this.quantityAvailable = quantityAvailable;
	}

	public Supplier getSupplier() {
		return supplier;
	}

	public void setSupplier(Supplier supplier) {
		this.supplier = supplier;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
}
