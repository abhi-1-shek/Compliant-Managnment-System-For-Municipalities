import { ComplaintPieChart } from '../Admin/ComplaintPieCharts';

interface Complaint {
  status: string;
}

interface Props {
  complaints: Complaint[];
}

export function CitizenComplaintPieChart({ complaints }: Props) {
  const stats = {
    pending: complaints.filter(c => c.status === 'PENDING').length,
    inProgress: complaints.filter(c => c.status === 'IN_PROGRESS').length,
    resolved: complaints.filter(c => c.status === 'RESOLVED').length,
    rejected: complaints.filter(c => c.status === 'REJECTED').length,
  };

  return <ComplaintPieChart stats={stats} />;
}