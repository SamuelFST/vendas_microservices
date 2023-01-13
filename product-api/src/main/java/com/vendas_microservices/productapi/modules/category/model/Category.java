package com.vendas_microservices.productapi.modules.category.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.beans.BeanUtils;

import com.vendas_microservices.productapi.modules.category.dto.CategoryRequest;

@Entity
@Table(name = "categories")
public class Category {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Integer id;
	
	@Column(name = "description", nullable = false, unique = true)
	private String description;
	
	public Category() {
	}

	public Category(Integer id, String description) {
		this.id = id;
		this.description = description;
	}

	public static Category of(CategoryRequest request) {
		Category category = new Category();
		BeanUtils.copyProperties(request, category);
		return category;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}
