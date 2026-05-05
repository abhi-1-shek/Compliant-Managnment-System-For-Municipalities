package com.cms.controller;

import com.cms.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin("*")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/admin")
    public Object admin() {
        return dashboardService.adminDashboard();
    }

    @GetMapping("/staff")
    public Object staff(Authentication auth) {
        return dashboardService.staffDashboard(auth.getName());
    }

    @GetMapping("/citizen")
    public Object citizen(Authentication auth) {
        return dashboardService.citizenDashboard(auth.getName());
    }
}
