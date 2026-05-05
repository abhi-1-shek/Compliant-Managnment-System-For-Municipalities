package com.cms.dto;


public class AdminDashboardResponse {
    private long totalComplaints;
    private long pending;
    private long inProgress;
    private long resolved;
    private long rejected;
    private long totalUsers;
	public long getTotalComplaints() {
		return totalComplaints;
	}
	public void setTotalComplaints(long totalComplaints) {
		this.totalComplaints = totalComplaints;
	}
	public long getPending() {
		return pending;
	}
	public void setPending(long pending) {
		this.pending = pending;
	}
	public long getInProgress() {
		return inProgress;
	}
	public void setInProgress(long inProgress) {
		this.inProgress = inProgress;
	}
	public long getResolved() {
		return resolved;
	}
	public void setResolved(long resolved) {
		this.resolved = resolved;
	}
	public long getRejected() {
		return rejected;
	}
	public void setRejected(long rejected) {
		this.rejected = rejected;
	}
	public long getTotalUsers() {
		return totalUsers;
	}
	public void setTotalUsers(long totalUsers) {
		this.totalUsers = totalUsers;
	}
}
