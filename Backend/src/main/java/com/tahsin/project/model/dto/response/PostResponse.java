package com.tahsin.project.model.dto.response;

import java.time.LocalDateTime;
import java.util.List;

public record PostResponse(
        Long id,
        String name,
        String title,
        String content,
        LocalDateTime createTime,
        List<CommentResponse> comments
) {}
