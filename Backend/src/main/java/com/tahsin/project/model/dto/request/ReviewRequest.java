package com.tahsin.project.model.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.Objects;

public final class ReviewRequest {
    private final Long customerID;
    private final Long productID;
    private final int rating;
    private final  String comment;
    private final  LocalDateTime reviewDate;

    public ReviewRequest(
            Long customerID,
            Long productID,
            //max min rating could be added
            int rating,
            @Size(max = 400, message = "Comment length must shorter than 400 characters")
            String comment,
            @NotNull
            LocalDateTime reviewDate

    ) {
        this.customerID = customerID;
        this.productID = productID;
        this.rating = rating;
        this.comment = comment;
        this.reviewDate = reviewDate;
    }

    public Long customerID() {
        return customerID;
    }

    public Long productID() {
        return productID;
    }

    public int rating() {
        return rating;
    }

    public @Size(max = 400, message = "Comment length must shorter than 400 characters") String comment() {
        return comment;
    }

    public @NotNull LocalDateTime reviewDate() {
        return reviewDate;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == this) return true;
        if (obj == null || obj.getClass() != this.getClass()) return false;
        var that = (ReviewRequest) obj;
        return Objects.equals(this.customerID, that.customerID) &&
                Objects.equals(this.productID, that.productID) &&
                this.rating == that.rating &&
                Objects.equals(this.comment, that.comment) &&
                Objects.equals(this.reviewDate, that.reviewDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(customerID, productID, rating, comment, reviewDate);
    }

    @Override
    public String toString() {
        return "ReviewRequest[" +
                "customerID=" + customerID + ", " +
                "productID=" + productID + ", " +
                "rating=" + rating + ", " +
                "comment=" + comment + ", " +
                "reviewDate=" + reviewDate + ']';
    }
}
