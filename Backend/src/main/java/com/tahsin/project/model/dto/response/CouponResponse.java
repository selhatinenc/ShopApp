package com.tahsin.project.model.dto.response;

import java.time.LocalDateTime;

public record CouponResponse(
        Long id,
        String code,
        int discount,
        LocalDateTime expiryDate,
        boolean isUsed
) {}
