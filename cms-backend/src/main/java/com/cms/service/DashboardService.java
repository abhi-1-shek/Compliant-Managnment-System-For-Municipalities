package com.cms.service;

import com.cms.dto.*;

public interface DashboardService {
    AdminDashboardResponse adminDashboard();
    StaffDashboardResponse staffDashboard(String staffEmail);
    CitizenDashboardResponse citizenDashboard(String userEmail);
}
