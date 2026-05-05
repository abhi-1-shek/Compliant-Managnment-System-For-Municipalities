package com.cms.dto;


import java.util.List;
import com.cms.model.Complaint;


public class StaffDashboardResponse {
    private long assignedCount;
    private long resolvedCount;
    private long pendingCount;
    private List<Complaint> assignedComplaints;
	public long getAssignedCount() {
		return assignedCount;
	}
	public void setAssignedCount(long assignedCount) {
		this.assignedCount = assignedCount;
	}
	public long getResolvedCount() {
		return resolvedCount;
	}
	public void setResolvedCount(long resolvedCount) {
		this.resolvedCount = resolvedCount;
	}
	public long getPendingCount() {
		return pendingCount;
	}
	public void setPendingCount(long pendingCount) {
		this.pendingCount = pendingCount;
	}
	public List<Complaint> getAssignedComplaints() {
		return assignedComplaints;
	}
	public void setAssignedComplaints(List<Complaint> assignedComplaints) {
		this.assignedComplaints = assignedComplaints;
	}
}
