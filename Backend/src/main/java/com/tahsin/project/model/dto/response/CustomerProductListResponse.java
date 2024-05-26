package com.tahsin.project.model.dto.response;

import java.util.List;

public record CustomerProductListResponse (
        Long id,
        String name,
        String username,
        List<ProductResponse> products,
        double price
) {}
