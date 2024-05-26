package com.tahsin.project.model.dto.response;

import com.tahsin.project.model.enums.Gender;
import com.tahsin.project.model.enums.UserType;

import java.util.List;

public record CustomerResponse(
        Long id,
        String name,
        String username,
        String email,
        Gender gender,
        String profilePicture,
        List<PostResponse> posts,
        List<RewardResponse> rewards,
        UserType role
) {}
