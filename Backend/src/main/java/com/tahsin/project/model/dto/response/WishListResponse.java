package com.tahsin.project.model.dto.response;

import com.tahsin.project.model.entity.Product;

import java.util.List;

public record WishListResponse(
        Long id,
        List<Product> products) {
}
