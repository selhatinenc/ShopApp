package com.tahsin.project.model.dto.response;

import com.tahsin.project.model.enums.Gender;
import java.util.List;

public record ModeratorResponse(
        Long id,
        String name,
        String username,
        String email,
        Gender gender,
        List<ModeratorCommunityResponse> community,
        String profile_picture
) {}