package com.tahsin.project.repository;

import com.tahsin.project.model.entity.Customer;
import com.tahsin.project.model.entity.Merchant;
import com.tahsin.project.model.entity.Moderator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ModeratorRepository extends JpaRepository<Moderator, Long> {
    Moderator findByEmailIgnoreCase(String emailId);
    Optional<Moderator> findByNameIgnoreCase(String name);

    Boolean existsByEmail(String email);
}
