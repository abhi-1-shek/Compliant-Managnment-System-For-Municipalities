package com.cms.repository;

import com.cms.model.Feedback;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface FeedbackRepository extends MongoRepository<Feedback, String> {

    List<Feedback> findBySubmittedBy(String submittedBy);
    boolean existsByComplaintId(String complaintId);
    List<Feedback> findByComplaintId(String complaintId);
}