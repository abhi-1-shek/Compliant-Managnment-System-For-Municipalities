package com.cms.service.impl;

import com.cms.dto.FeedbackRequest;
import com.cms.model.Complaint;
import com.cms.model.ComplaintStatus;
import com.cms.model.Feedback;
import com.cms.repository.ComplaintRepository;
import com.cms.repository.FeedbackRepository;
import com.cms.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private ComplaintRepository complaintRepository;

    @Override
    public void submitFeedback(FeedbackRequest req, Authentication auth) {

        Complaint complaint = complaintRepository.findById(req.getComplaintId())
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        if (!(complaint.getStatus() == ComplaintStatus.RESOLVED ||
              complaint.getStatus() == ComplaintStatus.REJECTED)) {
            throw new RuntimeException(
                "Feedback allowed only after complaint is resolved or rejected"
            );
        }

        if (complaint.isFeedbackSubmitted()) {
            throw new RuntimeException("Feedback already submitted");
        }

        Feedback feedback = new Feedback();
        feedback.setComplaintId(complaint.getId());
        feedback.setRating(req.getRating());
        feedback.setFeedbackText(req.getFeedbackText());
        feedback.setSubmittedBy(auth.getName());

        feedbackRepository.save(feedback);

      
        complaint.setFeedbackSubmitted(true);
        complaintRepository.save(complaint);
    }

    @Override
    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }

    @Override
    public List<Feedback> getMyFeedbacks(String userEmail) {
        return feedbackRepository.findBySubmittedBy(userEmail);
    }

    @Override
    public List<Feedback> getFeedbackByComplaintId(String complaintId) {
        return feedbackRepository.findByComplaintId(complaintId);
    }
}