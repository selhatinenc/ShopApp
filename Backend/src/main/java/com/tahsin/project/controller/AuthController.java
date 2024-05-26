package com.tahsin.project.controller;

import com.tahsin.project.model.entity.LoginRequest;
import com.tahsin.project.model.entity.LoginResponse;
import com.tahsin.project.service.AuthService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody @Validated LoginRequest request){
        return authService.attemptLogin(request.getEmail(),request.getPassword());
    }



}
