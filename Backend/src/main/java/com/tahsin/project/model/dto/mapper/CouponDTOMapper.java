package com.tahsin.project.model.dto.mapper;

import com.tahsin.project.model.dto.request.CouponRequest;
import com.tahsin.project.model.dto.response.CouponResponse;
import com.tahsin.project.model.entity.Coupon;
import org.springframework.stereotype.Service;
import java.util.function.Function;

@Service
public class CouponDTOMapper implements Function<Coupon, CouponResponse> {

    @Override
    public CouponResponse apply(Coupon coupon) {
        return new CouponResponse(
                coupon.getId(),
                coupon.getCode(),
                coupon.getDiscount(),
                coupon.getExpiryDate(),
                coupon.isUsed()
        );
    }

    public Coupon CouponRequestToCoupon(CouponRequest request) {
        Coupon coupon = new Coupon();
        coupon.setDiscount(request.discount());
        coupon.setExpiryDate(request.expiryDate());
        return coupon;
    }

}
