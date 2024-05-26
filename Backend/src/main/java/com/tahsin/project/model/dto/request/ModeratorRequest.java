package com.tahsin.project.model.dto.request;

import com.tahsin.project.model.enums.Gender;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.NotNull;

public record ModeratorRequest(
        String name,
        String username,
        String email,
        String password,
        Gender gender,
        String phoneNumber,
        String profilePicture
) {}
