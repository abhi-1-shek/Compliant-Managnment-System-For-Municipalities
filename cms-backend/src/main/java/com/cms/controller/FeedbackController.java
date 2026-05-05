package com.cms.controller;

import com.cms.dto.FeedbackRequest;
import com.cms.model.Feedback;
import com.cms.service.FeedbackService;
import jakarta.validation.Valid;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @PostMapping("/submit")
    public ResponseEntity<?> submit(
            @Valid @RequestBody FeedbackRequest request,
            Authentication auth
    ) {
        feedbackService.submitFeedback(request, auth);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/complaint/{complaintId}")
    public ResponseEntity<List<Feedback>> getByComplaint(
            @PathVariable String complaintId
    ) {
        return ResponseEntity.ok(
            feedbackService.getFeedbackByComplaintId(complaintId)
        );
    }
    
    
}