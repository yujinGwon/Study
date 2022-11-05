package com.springboot.jpa.data.repository;

import com.springboot.jpa.data.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // 메서드를 생성하지 않아도, 기본 메서드 제공 상속받은 곳에서 사용 가능
    // findAll, findAll(sort), findAllById(ids), saveAll(entities), flush
    // saveAndFlush(entity), saveAllAndFlush(entities) 등...
}
