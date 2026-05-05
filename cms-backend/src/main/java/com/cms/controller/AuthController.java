package com.cms.controller;

import com.cms.dto.AuthResponse;
import com.cms.dto.LoginRequest;
import com.cms.dto.RegisterRequest;
import com.cms.model.User;
import com.cms.service.AuthService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;


@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private AuthService authService;
    
    


    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }
    

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }
    @GetMapping("/me")
    public User me(Authentication auth) {
        return authService.getCurrentUser(auth.getName());
    }

}	
