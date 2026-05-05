package com.cms.service;

import com.cms.dto.FeedbackRequest;
import com.cms.model.Feedback;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface FeedbackService {

    void submitFeedback(FeedbackRequest request, Authentication auth);

    List<Feedback> getAllFeedbacks();
    List<Feedback> getMyFeedbacks(String userEmail);
    List<Feedback> getFeedbackByComplaintId(String complaintId);
}