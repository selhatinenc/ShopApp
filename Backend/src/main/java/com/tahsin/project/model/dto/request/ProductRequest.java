package com.tahsin.project.model.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ProductRequest(

        String name,
        String description,
        double price,
        String categoryName,
        Long merchantId,
        int stock,
        String image
) {}
