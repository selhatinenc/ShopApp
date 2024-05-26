package com.tahsin.project.model.dto.request;

import java.time.LocalDateTime;
import jakarta.validation.constraints.NotNull;

public record CouponRequest(
        //check discount is between 1-100 or not
        int discount,
        LocalDateTime expiryDate
) {}
