package com.tahsin.project.model.dto.response;

import com.tahsin.project.model.enums.RewardType;

public record RewardResponse(
        Long id,
        Long couponId,
        String code,
        RewardType rewardType,
        int points
) {}
