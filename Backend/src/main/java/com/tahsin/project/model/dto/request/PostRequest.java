package com.tahsin.project.model.dto.request;

import java.time.LocalDateTime;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.NotNull;

public record PostRequest(
        String title,

        String content,
        LocalDateTime postDate,
        Long customerId,
        String community
) {}

