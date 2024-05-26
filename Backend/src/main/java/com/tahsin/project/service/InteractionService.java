package com.tahsin.project.service;

import com.tahsin.project.model.entity.Category;
import com.tahsin.project.model.entity.Customer;
import com.tahsin.project.model.entity.Product;
import com.tahsin.project.model.entity.UserInteraction;
import com.tahsin.project.repository.CategoryRepository;
import com.tahsin.project.repository.CustomerRepository;
import com.tahsin.project.repository.ProductRepository;
import com.tahsin.project.repository.UserInteractionRepository;
import jakarta.transaction.Transactional;
import org.springdoc.api.OpenApiResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class InteractionService {

    private final UserInteractionRepository userInteractionRepository;
    private final ProductRepository productRepository;
    private final CustomerRepository customerRepository;
    private final CategoryRepository categoryRepository;

    public InteractionService(UserInteractionRepository userInteractionRepository, ProductRepository productRepository, CustomerRepository customerRepository, CategoryRepository categoryRepository) {
        this.userInteractionRepository = userInteractionRepository;
        this.productRepository = productRepository;
        this.customerRepository = customerRepository;
        this.categoryRepository = categoryRepository;
    }

    @Transactional
    public void saveInteraction(Long customerId, Long categoryId) {
        // Fetch the customer and category entities
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new OpenApiResourceNotFoundException("Customer not found with ID: " + customerId));
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new OpenApiResourceNotFoundException("Category not found with ID: " + categoryId));

        // Create and save the interaction
        UserInteraction interaction = new UserInteraction();
        interaction.setCustomer(customer);
        interaction.setCategory(category);
        userInteractionRepository.save(interaction);
    }

    @Transactional
    public List<Product> getRecommendation(Long customerId) {

        List<UserInteraction> interactions = userInteractionRepository.findByCustomerId(customerId);;
        UserInteraction lastInteraction = interactions.get(interactions.size() - 1);
        if (lastInteraction == null) {
            return null;
        }

        Category category = lastInteraction.getCategory();

        List<Product> products = productRepository.findAllByCategory(category);

        Collections.shuffle(products);

        int halfSize = (int) Math.ceil(products.size() / 2.0);
        return products.stream().limit(halfSize).collect(Collectors.toList());
    }
}