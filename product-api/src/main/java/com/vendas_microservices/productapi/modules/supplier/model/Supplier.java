package com.vendas_microservices.productapi.modules.supplier.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.beans.BeanUtils;

import com.vendas_microservices.productapi.modules.supplier.dto.SupplierRequest;

@Entity
@Table(name = "suppliers")
public class Supplier {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Integer id;
	
	@Column(name = "name", nullable = false, unique = true)
	private String name;

	public Supplier() {
	}
	
	public Supplier(Integer id, String name) {
		this.id = id;
		this.name = name;
	}
	
	public static Supplier of(SupplierRequest request) {
		Supplier supplier = new Supplier();
		BeanUtils.copyProperties(request, supplier);
		return supplier;
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
}
