package com.tahsin.project.model.dto.mapper;

import com.tahsin.project.model.dto.request.ReviewRequest;
import com.tahsin.project.model.dto.response.ReviewResponse;
import com.tahsin.project.model.entity.Review;
import com.tahsin.project.service.CustomerService;
import com.tahsin.project.service.ProductService;
import org.springframework.stereotype.Service;
import java.util.function.Function;

@Service
public class ReviewDTOMapper implements Function<Review,ReviewResponse> {

    private final CustomerService customerService;
    private final ProductService productService;

    public ReviewDTOMapper(CustomerService customerService, ProductService productService) {
        this.customerService = customerService;
        this.productService = productService;
    }

    @Override
    public ReviewResponse apply(Review review) {
        return new ReviewResponse(
                review.getId(),
                review.getCustomer().getUsername(),
                review.getProduct().getName(),
                review.getProduct().getId(),
                review.getRating(),
                review.getComment(),
                review.getReviewDate()
        );
    }

    public Review ReviewRequestToReview(ReviewRequest request){
        Review review = new Review();
        review.setComment(request.comment());
        review.setCustomer(customerService.findCustomerById(request.customerID()));
        review.setProduct(productService.findProductById(request.productID()));
        review.setRating(request.rating());
        review.setComment(request.comment());
        review.setReviewDate(request.reviewDate());
        return review;
    }
}
