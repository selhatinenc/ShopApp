package com.tahsin.project.model.dto.mapper;

import com.tahsin.project.model.dto.response.WishListResponse;
import com.tahsin.project.model.entity.WishList;
import com.tahsin.project.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.function.Function;
@Service
public class WishListDTOMapper implements Function<WishList, WishListResponse> {

    private final ProductService productService;

    public WishListDTOMapper(ProductService productService) {
        this.productService = productService;
    }

    @Override
    public WishListResponse apply(WishList wishList) {
        if(wishList.getProducts() != null){
            return new WishListResponse(
                    wishList.getId(),
                    wishList.getProducts()
            );
        }
        return new WishListResponse(
                wishList.getId()
                ,null);
    }


}
