package com.cms.repository;

import com.cms.model.Complaint;
import com.cms.model.ComplaintStatus;

import org.springdoc.core.converters.models.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ComplaintRepository extends MongoRepository<Complaint, String> {
    List<Complaint> findByUserId(String userId);
    List <Complaint> findByAssignedTo(String userId);
    List <Complaint> findByStatus(String status);
    long countByStatus(ComplaintStatus status);
    long countByAssignedTo(String staffEmail);
    long countByUserId(String userEmail);

    
    
}
