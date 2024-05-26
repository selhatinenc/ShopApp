package com.tahsin.project.controller;

import com.tahsin.project.model.dto.response.CustomerResponse;
import com.tahsin.project.model.dto.response.WishListResponse;
import com.tahsin.project.model.entity.Customer;
import com.tahsin.project.service.CustomerService;
import com.tahsin.project.service.WishListService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/wishList")
public class WishListController {
    private final WishListService wishListService;
    private final CustomerService customerService;

    public WishListController(WishListService wishListService, CustomerService customerService) {
        this.wishListService = wishListService;
        this.customerService = customerService;
    }

    @GetMapping("/customerName/{name}")
    public ResponseEntity<WishListResponse> getWishListByCustomerName(@PathVariable String name) {
        try {
            WishListResponse wishList = wishListService.getCustomerByName(name);
            return ResponseEntity.ok(wishList);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/")
    public ResponseEntity<WishListResponse> getWishListByCustomerId(@RequestParam Long id) {
        try {
            WishListResponse wishList = wishListService.getCustomerById(id);
            return ResponseEntity.ok(wishList);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping("/assign")
    public ResponseEntity<WishListResponse> assignProductToWishList(
            @RequestParam("customerId") Long customerId, @RequestParam("productId") Long productId) {
        WishListResponse assignedWishList = wishListService.assignProductToWishList(customerId,productId);
        return ResponseEntity.ok(assignedWishList);
    }
    @PutMapping("/dissociate")
    public ResponseEntity<String> dissociateProductFromWishList(
            @RequestParam("customerId") Long moderatorId, @RequestParam("prouctId") Long prouctId) {
        wishListService.dissociateCommunityFromModerator(moderatorId,prouctId);
        return ResponseEntity.ok("Product removed from the wishlist succesfully.");
    }
}