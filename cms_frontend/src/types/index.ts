export type Role = 'ADMIN' | 'STAFF' | 'CITIZEN';

export interface Profile {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
}


export type ComplaintStatus = 'pending' | 'assigned' | 'in_progress' | 'resolved' | 'rejected';

export type ComplaintPriority = 'low' | 'medium' | 'high' | 'urgent';


export interface Category {
  id: string;
  name: string;
  description?: string;
  created_at: string;
}

export interface Complaint {
  id: string;
  user_id: string;
  category_id: string;
  title: string;
  description: string;
  location: string;
  status: ComplaintStatus;
  priority: ComplaintPriority;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
  resolved_at?: string;
  user?: Profile;
  category?: Category;
  assigned_manager?: Profile;
}

export interface ComplaintComment {
  id: string;
  complaint_id: string;
  user_id: string;
  comment: string;
  created_at: string;
  user?: Profile;
}
