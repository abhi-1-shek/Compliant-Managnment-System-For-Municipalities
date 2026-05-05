package com.cms.service.impl;

import com.cms.dto.*;
import com.cms.model.ComplaintStatus;
import com.cms.repository.*;
import com.cms.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private ComplaintRepository complaintRepo;

    @Autowired
    private UserRepository userRepo;

    @Override
    public AdminDashboardResponse adminDashboard() {
        AdminDashboardResponse d = new AdminDashboardResponse();
        d.setTotalComplaints(complaintRepo.count());
        d.setPending(complaintRepo.countByStatus(ComplaintStatus.PENDING));
        d.setInProgress(complaintRepo.countByStatus(ComplaintStatus.IN_PROGRESS));
        d.setResolved(complaintRepo.countByStatus(ComplaintStatus.RESOLVED));
        d.setRejected(complaintRepo.countByStatus(ComplaintStatus.REJECTED));
        d.setTotalUsers(userRepo.count());
        return d;
    }

    @Override
    public StaffDashboardResponse staffDashboard(String staffEmail) {
        StaffDashboardResponse d = new StaffDashboardResponse();
        d.setAssignedComplaints(complaintRepo.findByAssignedTo(staffEmail));
        d.setAssignedCount(d.getAssignedComplaints().size());
        d.setResolvedCount(
            d.getAssignedComplaints().stream()
                .filter(c -> c.getStatus() == ComplaintStatus.RESOLVED)
                .count()
        );
        d.setPendingCount(
            d.getAssignedComplaints().stream()
                .filter(c -> c.getStatus() != ComplaintStatus.RESOLVED)
                .count()
        );
        return d;
    }

    @Override
    public CitizenDashboardResponse citizenDashboard(String userEmail) {
        CitizenDashboardResponse d = new CitizenDashboardResponse();
        d.setMyComplaints(complaintRepo.findByUserId(userEmail));
        d.setTotalComplaints(d.getMyComplaints().size());
        d.setResolved(
            d.getMyComplaints().stream()
                .filter(c -> c.getStatus() == ComplaintStatus.RESOLVED)
                .count()
        );
        d.setPending(d.getTotalComplaints() - d.getResolved());
        return d;
    }
}
