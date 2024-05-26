package com.tahsin.project.repository;

import com.tahsin.project.model.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    boolean existsCustomerByEmail(String email);
    boolean existsCustomerByUsername(String username);
    Optional<Customer> findCustomerByEmail(String email);
    Optional<Customer> findCustomerByName(String name);
    Optional<Customer> findCustomerById(Long id);
    Customer findByEmailIgnoreCase(String emailId);

    Boolean existsByEmail(String email);
}
