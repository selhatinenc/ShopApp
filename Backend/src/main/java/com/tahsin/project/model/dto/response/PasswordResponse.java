package com.tahsin.project.model.dto.response;

import com.tahsin.project.model.base.EntityBase;
import com.tahsin.project.model.entity.Customer;

public class PasswordResponse implements EntityBase {
    private Customer customer;
    private String password;
    private String recoveryMessage;

    public PasswordResponse(Customer customer, String password, String recoveryMessage) {
        this.customer = customer;
        this.password = password;
        this.recoveryMessage = recoveryMessage;
    }

    public String getRecoveryMessage() {
        return this.recoveryMessage;
    }

    public String getPassword() {
        return this.password;
    }

    public Customer getCustomer() {
        return this.customer;
}
}