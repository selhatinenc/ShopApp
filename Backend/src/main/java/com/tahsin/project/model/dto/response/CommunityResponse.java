package com.tahsin.project.model.dto.response;

import java.util.List;

public record CommunityResponse(
        String name,
        String description,
        List<CommunityModeratorResponse> moderators
) {}
