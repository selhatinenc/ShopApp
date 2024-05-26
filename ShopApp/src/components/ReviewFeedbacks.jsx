import React, { useState, useEffect } from 'react';

function ReviewFeedbacks() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
       // setReviews(reviewArray);
       fetchReviews();
    }, []);
    const reviewArray = [
        {
            id: 1,
            customerUsername: "john_doe",
            productName: "Product A",
            rating: 4,
            comment: "Great product!",
            reviewDate: "2024-05-01T08:30:00Z"
        },
        {
            id: 4,
            customerUsername: "john_doe",
            productName: "Product A",
            rating: 4,
            comment: "Great product!",
            reviewDate: "2024-05-01T08:30:00Z"
        },
        {
            id: 1,
            customerUsername: "john_doe",
            productName: "Product A",
            rating: 4,
            comment: "Great product!",
            reviewDate: "2024-05-01T08:30:00Z"
        },
        {
            id: 1,
            customerUsername: "john_doe",
            productName: "Product A",
            rating: 4,
            comment: "Great product!",
            reviewDate: "2024-05-01T08:30:00Z"
        },
        {
            id: 1,
            customerUsername: "john_doe",
            productName: "Product A",
            rating: 4,
            comment: "Great product!",
            reviewDate: "2024-05-01T08:30:00Z"
        },
        {
            id: 1,
            customerUsername: "john_doe",
            productName: "Product A",
            rating: 4,
            comment: "Great product!",
            reviewDate: "2024-05-01T08:30:00Z"
        },
        {
            id: 1,
            customerUsername: "john_doe",
            productName: "Product A",
            rating: 4,
            comment: "Great product!",
            reviewDate: "2024-05-01T08:30:00Z"
        },
        {
            id: 2,
            customerUsername: "jane_smith",
            productName: "Product B",
            rating: 5,
            comment: "Absolutely amazing!",
            reviewDate: "2024-04-30T15:45:00Z"
        },
        {
            id: 3,
            customerUsername: "sam_jackson",
            productName: "Product C",
            rating: 3,
            comment: "Could be better.",
            reviewDate: "2024-04-29T12:00:00Z"
        }
    ];

    

    const fetchReviews = async () => {
        try {
            const response = await fetch('http://localhost:8080/review/all');
            if (!response.ok) {
                throw new Error('Failed to fetch reviews');
            }
            const data = await response.json();
            setReviews(data);
            
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-3xl font-bold mb-4">Review Feedbacks</h2>
            <div className="grid grid-cols-2 gap-4">
                {reviews.map(review => (
                    <div key={review.id} className="border border-gray-300 rounded-md p-4">
                        <p><span className="font-bold">Customer Username:</span> {review.customerUsername}</p>
                        <p><span className="font-bold">Product Name:</span> {review.productName}</p>
                        <p><span className="font-bold">Rating:</span> {review.rating}</p>
                        <p><span className="font-bold">Comment:</span> {review.comment}</p>
                        <p><span className="font-bold">Review Date:</span> {new Date(review.reviewDate).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ReviewFeedbacks;
