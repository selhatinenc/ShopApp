package com.tahsin.project.model.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CommentRequest(
        Long userId,
        Long postId,
        String content
) {}
