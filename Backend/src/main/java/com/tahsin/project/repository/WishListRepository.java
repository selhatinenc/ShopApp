package com.tahsin.project.repository;

import com.tahsin.project.model.entity.Customer;
import com.tahsin.project.model.entity.Reward;
import com.tahsin.project.model.entity.WishList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishListRepository extends JpaRepository<WishList, Long> {
    @NonNull
    WishList save(@NonNull WishList wishList);
    Optional<WishList> findByCustomer(Customer customer);
}