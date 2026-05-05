package com.cms.email;

import com.cms.model.Complaint;

public interface NotificationService {
    void notifyComplaintCreated(Complaint c);
    void notifyComplaintAssigned(Complaint c);
    void notifyComplaintStatusChanged(Complaint c);
}