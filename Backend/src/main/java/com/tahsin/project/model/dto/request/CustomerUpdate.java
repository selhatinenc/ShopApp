package com.tahsin.project.model.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record CustomerUpdate(

        String name,

        String email,

        String password,
        String phoneNumber,
        String profilePicture
) {
}
