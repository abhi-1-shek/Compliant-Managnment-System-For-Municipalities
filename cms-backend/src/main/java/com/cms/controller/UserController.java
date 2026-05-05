package com.cms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cms.model.User;
import com.cms.repository.UserRepository;

@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserRepository userRepo;

    @GetMapping("/staff")
    public List<User> getStaff() {
        return userRepo.findAll()
                .stream()
                .filter(u -> "STAFF".equals(u.getRole()))
                .toList();
    }
}
