package com.cms.service;

import com.cms.model.Complaint;

import org.springdoc.core.converters.models.Sort;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;



public interface ComplaintService {
    Complaint createComplaint(String userId, String title, String description, String category, MultipartFile image) throws Exception;
    List<Complaint> getComplaintsByUser(String userId);
    List<Complaint> getAssignedComplaints(String userId);
    List<Complaint> getAllComplaints();
    Complaint getComplaintById(String id);
    Complaint updateComplaintStatus(String id, String staffUserId, String notes, String status);
    Complaint assignComplaint(String id, String adminUserId, String staffUserId);
    void deleteComplaint(String complaintId, String userEmail);
}