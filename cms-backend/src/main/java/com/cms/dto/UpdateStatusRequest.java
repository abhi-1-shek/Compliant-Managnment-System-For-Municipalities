package com.cms.dto;

import lombok.Data;
import com.cms.model.ComplaintStatus;


@Data
public class UpdateStatusRequest {
	private ComplaintStatus status;
	private String notes;
	public ComplaintStatus getStatus() {
		return status;
	}
	public void setStatus(ComplaintStatus status) {
		this.status = status;
	}
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
	}
	
}
