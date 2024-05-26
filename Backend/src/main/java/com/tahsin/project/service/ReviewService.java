package com.tahsin.project.service;

import com.tahsin.project.exception.ReviewNotFoundException;
import com.tahsin.project.model.dto.request.ReviewRequest;
import com.tahsin.project.model.dto.response.ReviewResponse;
import com.tahsin.project.model.entity.Review;
import com.tahsin.project.model.dto.mapper.ReviewDTOMapper;
import com.tahsin.project.repository.ReviewRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final ReviewDTOMapper mapper;

    public ReviewService(ReviewRepository reviewRepository, ReviewDTOMapper mapper) {
        this.reviewRepository = reviewRepository;
        this.mapper = mapper;
    }

    public ReviewResponse getReviewById(Long id){
        return reviewRepository.findById(id).map(mapper).orElseThrow(()->
                new ReviewNotFoundException("Review could not find by id: "+id));

    }
    public Review findReviewById(Long id){
        return reviewRepository.findById(id).orElseThrow(()->
                new ReviewNotFoundException("Review could not find by id: "+id));

    }

    public List<ReviewResponse> getAllReviews() {
        return reviewRepository.findAll().stream().map(mapper).collect(Collectors.toList());
    }

    public Review createReview(ReviewRequest request) {
        Review review = mapper.ReviewRequestToReview(request);
        return reviewRepository.save(review);
    }

    public ReviewResponse updateReview(Long id, ReviewRequest request) {
        Review review = mapper.ReviewRequestToReview(request);
        review.setId(id);
        return mapper.apply(reviewRepository.save(review));
    }

    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }
}
