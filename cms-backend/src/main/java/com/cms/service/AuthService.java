package com.cms.service;

import com.cms.dto.AuthResponse;
import com.cms.dto.LoginRequest;
import com.cms.dto.RegisterRequest;
import com.cms.model.User;

public interface AuthService {
    User register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
    User getCurrentUser(String email);
}
