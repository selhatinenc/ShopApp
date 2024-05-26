package com.tahsin.project.model.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UpdatePostRequest(
        Long id,
        String content
) {}
//Bu tarz recordlar da oluşturmalıyız. Update methodları çok saçma bi vaziyette şuan...
