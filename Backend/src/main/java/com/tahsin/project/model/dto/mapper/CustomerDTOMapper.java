package com.tahsin.project.model.dto.mapper;

import com.tahsin.project.model.dto.response.CommentResponse;
import com.tahsin.project.model.dto.response.CustomerProductListResponse;
import com.tahsin.project.model.dto.response.CustomerResponse;
import com.tahsin.project.model.dto.response.PostResponse;
import com.tahsin.project.model.entity.Customer;
import com.tahsin.project.model.entity.Product;
import com.tahsin.project.model.enums.UserType;
import org.springframework.stereotype.Service;
import com.tahsin.project.model.dto.request.CustomerRequest;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class CustomerDTOMapper implements Function<Customer, CustomerResponse> {

    private final RewardDTOMapper mapper;
    private final ProductDTOMapper productDTOMapper;

    public CustomerDTOMapper(RewardDTOMapper mapper, ProductDTOMapper productDTOMapper) {
        this.mapper = mapper;
        this.productDTOMapper = productDTOMapper;
    }

    @Override
    public CustomerResponse apply(Customer customer) {
        return new CustomerResponse(
                customer.getId(),
                customer.getName(),
                customer.getUsername(),
                customer.getEmail(),
                customer.getGender(),
                customer.getProfilePicture(),
                customer.getPosts().stream().
                        map(post ->  new PostResponse(post.getId(),
                                post.getCustomer().getName(),
                                post.getContent(),
                                post.getTitle(),
                                post.getPostDate(),
                                post.getComments().stream().map(comment -> new CommentResponse(comment.getId(),comment.getCommentDate(),comment.getContent())).collect(Collectors.toList()))).collect(Collectors.toList()),
                customer.getRewards().stream().map(mapper).collect(Collectors.toList()),
                customer.getRole()
        );
    }

    public Customer mapCustomerRequestToCustomer(CustomerRequest customerRequest) {
        Customer customer = new Customer();
        customer.setName(customerRequest.name());
        customer.setUsername(customerRequest.username());
        customer.setEmail(customerRequest.email());
        customer.setPassword(customerRequest.password());
        customer.setGender(customerRequest.gender());
        customer.setPhoneNumber(customerRequest.phoneNumber());
        customer.setProfilePicture(customerRequest.profilePicture());
        customer.setAddress(customerRequest.address());
        customer.setRole(UserType.ROLE_USER);
        return customer;
    }

    public CustomerProductListResponse mapCustomerToCustomerProductListResponse(Customer customer) {

        return new CustomerProductListResponse(customer.getId(),customer.getName(),customer.getUsername(),customer.getProducts().stream().map(productDTOMapper).collect(Collectors.toList()),
                customer.getProducts().stream().mapToDouble(Product::getPrice).sum());
    }

}


