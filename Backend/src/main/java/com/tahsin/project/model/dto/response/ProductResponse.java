package com.tahsin.project.model.dto.response;

public record ProductResponse(
            Long id,
            String name,
            String description,
            double price,
            String categoryName,

            String merchantName,
            int stock,
            boolean available,
            String image

) {}