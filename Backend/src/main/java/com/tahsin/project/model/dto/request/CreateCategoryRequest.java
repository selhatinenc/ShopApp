package com.tahsin.project.model.dto.request;

import jakarta.validation.constraints.NotNull;

public record CreateCategoryRequest(
        String name,
        String parentName
) {}
