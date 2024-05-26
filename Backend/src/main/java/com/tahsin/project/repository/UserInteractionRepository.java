package com.tahsin.project.repository;

import com.tahsin.project.model.entity.Customer;
import com.tahsin.project.model.entity.UserInteraction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserInteractionRepository extends JpaRepository<UserInteraction, Long> {

    List<UserInteraction> findByCustomerId(Long customerId);
}

