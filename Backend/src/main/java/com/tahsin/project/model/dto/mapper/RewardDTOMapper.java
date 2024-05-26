package com.tahsin.project.model.dto.mapper;

import com.tahsin.project.model.dto.request.RewardRequest;
import com.tahsin.project.model.dto.response.RewardResponse;
import com.tahsin.project.model.entity.Reward;
import com.tahsin.project.model.enums.RewardType;
import com.tahsin.project.service.CouponService;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class RewardDTOMapper implements Function<Reward, RewardResponse> {

    private final CouponService couponService;

    public RewardDTOMapper(CouponService couponService) {
        this.couponService = couponService;
    }

    @Override
    public RewardResponse apply(Reward reward) {
        if(reward.getCoupon() == null){
            return new RewardResponse(
                    reward.getId(),
                    null,
                    null,
                    reward.getRewardType(),
                    reward.getPoints()
            );
        }
        return new RewardResponse(
                reward.getId(),
                reward.getCoupon().getId(),
                reward.getCoupon().getCode(),
                reward.getRewardType(),
                reward.getPoints()
        );
    }

    public Reward RewardRequestToReward(RewardRequest request) {
        Reward reward = new Reward();
        if(request.rewardType().equals(RewardType.REWARD_POINT))
            reward.setPoints(request.points());
        else reward.setCoupon(couponService.findCouponById(request.couponId()));
        reward.setRewardType(request.rewardType());
        return reward;
    }
}
