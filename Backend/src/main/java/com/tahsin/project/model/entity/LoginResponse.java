package com.tahsin.project.model.entity;

public class LoginResponse {

    private final String accessToken;

    public LoginResponse(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getAccessToken() {
        return accessToken;
    }
}
