package com.cms.email.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.cms.email.NotificationService;
import com.cms.model.Complaint;

@Service
public class EmailNotificationService implements NotificationService {

    @Autowired
    private JavaMailSender mailSender;

    private final String adminEmail = "sevangalion@gmail.com";

    
    private void safeSend(SimpleMailMessage message, String recipientInfo) {
        try {
            mailSender.send(message);
        } catch (Exception e) {
            
            System.err.println("Email sending failed (" + recipientInfo + "): " + e.getMessage());
        }
    }

    @Async
    @Override
    public void notifyComplaintCreated(Complaint c) {
        if (adminEmail == null || adminEmail.isBlank()) {
            System.err.println("Admin email missing. Skipping email.");
            return;
        }

        SimpleMailMessage m = new SimpleMailMessage();
        m.setTo(adminEmail);
        m.setSubject("New Complaint Created: " + c.getTitle());
        m.setText(
                "A new complaint has been created.\n\n" +
                "Title: " + c.getTitle() + "\n" +
                "Category: " + c.getCategory() + "\n" +
                "Created By: " + c.getUserId() + "\n" +
                "Complaint ID: " + c.getId()
        );

        safeSend(m, "ADMIN");
    }

    @Async
    @Override
    public void notifyComplaintStatusChanged(Complaint c) {
        String recipient = c.getUserId();

        if (recipient == null || recipient.isBlank()) {
            System.err.println("Citizen email missing. Skipping status update email.");
            return;
        }

        SimpleMailMessage m = new SimpleMailMessage();
        m.setTo(recipient);
        m.setSubject("Complaint Status Updated: " + c.getTitle());
        m.setText(
                "Your complaint status has been updated.\n\n" +
                "Status: " + c.getStatus() + "\n" +
                "Complaint ID: " + c.getId()
        );

        safeSend(m, "CITIZEN");
    }

    @Async
    @Override
    public void notifyComplaintAssigned(Complaint c) {
        String staffEmail = c.getAssignedTo();

        if (staffEmail == null || staffEmail.isBlank()) {
            System.err.println("Staff email missing. Skipping assignment email.");
            return;
        }

        SimpleMailMessage m = new SimpleMailMessage();
        m.setTo(staffEmail);
        m.setSubject("Complaint Assigned: " + c.getTitle());
        m.setText(
                "A complaint has been assigned to you.\n\n" +
                "Title: " + c.getTitle() + "\n" +
                "Category: " + c.getCategory() + "\n" +
                "Complaint ID: " + c.getId()
        );

        safeSend(m, "STAFF");
    }
}
