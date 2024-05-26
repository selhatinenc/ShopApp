package com.tahsin.project.model.dto.request;

import com.tahsin.project.model.entity.Product;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record WishListRequest(
    @NotNull
    Long id,@Nullable
    List<Product> products){
}
