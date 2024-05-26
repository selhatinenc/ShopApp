package com.tahsin.project.model.dto.response;

import java.time.LocalDateTime;

public record CommentResponse(
        Long id,
        LocalDateTime commentDate,
        String content
) {}
