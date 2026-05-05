package com.cms.controller;

import com.cms.model.Complaint;
import com.cms.service.ComplaintService;
import com.cms.dto.UpdateStatusRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/complaints")
@CrossOrigin("*")
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

    
    @PostMapping("/create")
    public ResponseEntity<?> createComplaint(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("category") String category,
            @RequestParam(value = "image", required = false) MultipartFile image,
            Authentication auth
    ) throws Exception {
        String userEmail = auth.getName(); 
       
        Complaint c = complaintService.createComplaint(userEmail, title, description, category, image);
        return ResponseEntity.ok(c);
    }


    @GetMapping("/my")
    public ResponseEntity<List<Complaint>> myComplaints(Authentication auth) {
        String userEmail = auth.getName();
        return ResponseEntity.ok(complaintService.getComplaintsByUser(userEmail));
    }

 
    @GetMapping("/assigned")
    public ResponseEntity<List<Complaint>> assigned(Authentication auth) {
        String userEmail = auth.getName();
        return ResponseEntity.ok(complaintService.getAssignedComplaints(userEmail));
    }

    
    @GetMapping("/all")
    public ResponseEntity<List<Complaint>> allComplaints() {
        return ResponseEntity.ok(complaintService.getAllComplaints());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Complaint> getById(@PathVariable String id) {
        return ResponseEntity.ok(complaintService.getComplaintById(id));
    }

   
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable String id, @RequestBody UpdateStatusRequest req, Authentication auth) {
        String staffUser = auth.getName();
        Complaint saved = complaintService.updateComplaintStatus(id, staffUser, req.getNotes(), req.getStatus().name());
        if (saved == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(saved);
    }

    
    @PutMapping("/{id}/assign")
    public ResponseEntity<?> assign(@PathVariable String id, @RequestParam("staff") String staffUserId, Authentication auth) {
        Complaint saved = complaintService.assignComplaint(id, auth.getName(), staffUserId);
        if (saved == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(saved);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComplaint(
            @PathVariable String id,
            Authentication authentication
    ) {
        String userEmail = authentication.getName();
        complaintService.deleteComplaint(id, userEmail);
        return ResponseEntity.noContent().build();
    }
}
