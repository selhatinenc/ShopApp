package com.tahsin.project.repository;

import com.tahsin.project.model.entity.Category;
import com.tahsin.project.model.entity.Product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByNameIgnoreCase(String name);
    List<Product> findAllByCategory(Category category);

}
