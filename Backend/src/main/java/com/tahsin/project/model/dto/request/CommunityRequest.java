package com.tahsin.project.model.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CommunityRequest(
        String name,
        String description
) {}
