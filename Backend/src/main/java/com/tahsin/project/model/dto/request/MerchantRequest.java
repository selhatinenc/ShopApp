package com.tahsin.project.model.dto.request;

import jakarta.validation.constraints.*;

public record MerchantRequest(
        String name,
        String email,
        String password,
        String phoneNumber

) {}
