package com.cms.dto;

import java.util.List;
import com.cms.model.Complaint;


public class CitizenDashboardResponse {
    private long totalComplaints;
    private long resolved;
    private long pending;
    private List<Complaint> myComplaints;
	public long getTotalComplaints() {
		return totalComplaints;
	}
	public void setTotalComplaints(long totalComplaints) {
		this.totalComplaints = totalComplaints;
	}
	public long getResolved() {
		return resolved;
	}
	public void setResolved(long resolved) {
		this.resolved = resolved;
	}
	public long getPending() {
		return pending;
	}
	public void setPending(long pending) {
		this.pending = pending;
	}
	public List<Complaint> getMyComplaints() {
		return myComplaints;
	}
	public void setMyComplaints(List<Complaint> myComplaints) {
		this.myComplaints = myComplaints;
	}
}
