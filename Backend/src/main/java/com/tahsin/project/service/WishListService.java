package com.tahsin.project.service;

import com.tahsin.project.model.dto.mapper.CustomerDTOMapper;
import com.tahsin.project.model.dto.mapper.WishListDTOMapper;
import com.tahsin.project.model.dto.response.WishListResponse;
import com.tahsin.project.model.entity.*;
import com.tahsin.project.repository.*;
import org.springdoc.api.OpenApiResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class WishListService {
    private final WishListRepository wishListRepository;
    private final CustomerRepository customerRepository;
    private final WishListDTOMapper mapper;
    private final ProductRepository productRepository;
    private final CustomerDTOMapper customerDTOMapper;

    public WishListService(WishListRepository wishListRepository, WishListDTOMapper mapper,
                           CustomerRepository customerRepository,
                           ProductRepository productRepository,CustomerDTOMapper customerDTOMapper) {
        this.wishListRepository = wishListRepository;
        this.mapper = mapper;
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
        this.customerDTOMapper = customerDTOMapper;
    }

    public WishListResponse assignProductToWishList(Long customerId, Long productId) {
        List<Product> products;

        Customer customer = customerRepository.findById(customerId).orElseThrow();
        Product product = productRepository.findById(productId).orElseThrow();
        WishList wishList = customer.getWishList();
        products = wishList.getProducts();

        List<Long> existingProductIds = wishList.getProducts().stream()
                .map(Product::getId)
                .toList();
        if (existingProductIds.contains(productId)) {
            // Product already exists in the wishlist, return existing wishlist
            return mapper.apply(wishList);
        }

        products.add(product);
        wishList.setProducts(products);
        wishListRepository.save(wishList);
        return mapper.apply(wishList);
    }

    public void dissociateCommunityFromModerator(Long customerId, Long productId) {
        List<Product> products;
        Customer customer = customerRepository.findById(customerId).orElseThrow();
        Product product = productRepository.findById(productId).orElseThrow();

        if (customer != null && product != null) {
            WishList wishList = customer.getWishList();
            products = wishList.getProducts();
            products.remove(product);
            wishList.setProducts(products);
            wishListRepository.save(wishList);
        }
    }

    public WishListResponse getCustomerByName(String name) {
        Customer customer = customerRepository.findCustomerByName(name).orElseThrow();
        return wishListRepository.findByCustomer(customer).map(mapper)
                .orElseThrow(() -> new OpenApiResourceNotFoundException("WishList not found for customer: " + customer.getUsername()));
    }

    public WishListResponse getCustomerById(Long Id) {
        Customer customer = customerRepository.findCustomerById(Id).orElseThrow();
        return wishListRepository.findByCustomer(customer).map(mapper)
                .orElseThrow(() -> new OpenApiResourceNotFoundException("WishList not found for customer: " + customer.getUsername()));

    }
}
