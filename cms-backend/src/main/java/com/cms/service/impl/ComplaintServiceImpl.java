package com.cms.service.impl;

import com.cms.model.Complaint;
import com.cms.model.ComplaintStatus;
import com.cms.repository.ComplaintRepository;
import com.cms.service.ComplaintService;
import com.cms.utils.FileStorageService;
import com.cms.email.NotificationService;

import org.springdoc.core.converters.models.Sort;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.SortedMap;

@Service
public class ComplaintServiceImpl implements ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private NotificationService notificationService;

    @Override
    public Complaint createComplaint(String userId, String title, String description, String category, MultipartFile image) throws Exception {
        Complaint c = new Complaint();
        c.setUserId(userId);
        c.setTitle(title);
        c.setDescription(description);
        c.setCategory(category);
        c.setCreatedAt(LocalDateTime.now());
        c.setUpdatedAt(LocalDateTime.now());
        if (image != null && !image.isEmpty()) {
            String path = fileStorageService.store(image);
            c.setImageUrl(path);
        }
        Complaint saved = complaintRepository.save(c);

        
        notificationService.notifyComplaintCreated(saved);
        return saved;
    }

    @Override
    public List<Complaint> getComplaintsByUser(String userId) {
        return complaintRepository.findByUserId(userId);
    }

    @Override
    public List<Complaint> getAssignedComplaints(String userId) {
        return complaintRepository.findByAssignedTo(userId);
    }

    @Override
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    @Override
    public Complaint getComplaintById(String id) {
        return complaintRepository.findById(id).orElse(null);
    }

    @Override
    public Complaint updateComplaintStatus(String id, String staffUserId, String notes, String status) {
        Optional<Complaint> opt = complaintRepository.findById(id);
        if (opt.isEmpty()) return null;
        Complaint c = opt.get();
        c.setStatus(com.cms.model.ComplaintStatus.valueOf(status));
        c.setNotes(notes);
        c.setUpdatedAt(LocalDateTime.now());
        Complaint saved = complaintRepository.save(c);

        notificationService.notifyComplaintStatusChanged(saved);
        return saved;
    }

    @Override
    public Complaint assignComplaint(String id, String adminUserId, String staffUserId) {
        Optional<Complaint> opt = complaintRepository.findById(id);
        if (opt.isEmpty()) return null;
        Complaint c = opt.get();
        c.setAssignedTo(staffUserId);
        c.setUpdatedAt(LocalDateTime.now());
        Complaint saved = complaintRepository.save(c);

        notificationService.notifyComplaintAssigned(saved);
        return saved;
    }

    @Override
    public void deleteComplaint(String complaintId, String userEmail) {

        Complaint complaint = complaintRepository.findById(complaintId)
            .orElseThrow(() -> new RuntimeException("Complaint not found"));

        // Ownership check
        if (!complaint.getUserId().equals(userEmail)) {
            throw new ResponseStatusException(
                HttpStatus.FORBIDDEN,
                "Not allowed"
            );
        }

       
        if (complaint.getStatus() != ComplaintStatus.PENDING) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Only pending complaints can be deleted"
            );
        }

  
        if (complaint.getImageUrl() != null) {
            try {
				Files.deleteIfExists(Paths.get(complaint.getImageUrl()));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
        }

        complaintRepository.delete(complaint);
    }
}
