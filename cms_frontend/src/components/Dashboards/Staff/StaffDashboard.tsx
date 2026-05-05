import { useEffect, useState } from 'react';
import { api } from '../../../lib/api';
import { useAuth } from '../../../contexts/AuthContext';
import { AssignedComplaints } from './AssignedComplaints';
import { StaffComplaintDetails } from './StaffComplaintDetails';
import { StaffStats } from './StaffStats';
import { StaffComplaintPieChart } from './StaffComplaintPieChart';

export function StaffDashboard() {
  const { signOut } = useAuth();

  const [complaints, setComplaints] = useState<any[]>([]);
  const [selectedComplaint, setSelectedComplaint] = useState<any | null>(null);

  useEffect(() => {
    api.get('/complaints/assigned')
      .then(res => setComplaints(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-app p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
  <div className="flex items-center gap-3">
    <img src="/logo.png" className="w-10 h-10 rounded-full" />
    <h1 className="text-2xl font-bold text-gray-800">
     Staff Dashboard
    </h1>
  </div>
        <button
          onClick={signOut}
          className="px-4 py-2 rounded-xl bg-red-100 text-red-700 hover:bg-red-200"
        >
          Logout
        </button>
      </div>

      {/* Stats */}
      <StaffStats complaints={complaints} />

      {/* Main Layout */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT COLUMN */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Pie Chart */}
          <StaffComplaintPieChart complaints={complaints} />

          {/* Assigned Complaints */}
          <AssignedComplaints
            complaints={complaints}
            onSelect={setSelectedComplaint}
            selectedId={selectedComplaint?.id}
          />
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-2">
          <StaffComplaintDetails
            complaint={selectedComplaint}
            onStatusUpdated={(updated) => {

              // Remove from list if resolved or rejected
              if (
                updated.status === 'RESOLVED' ||
                updated.status === 'REJECTED'
              ) {
                setComplaints(prev =>
                  prev.filter(c => c.id !== updated.id)
                );
                setSelectedComplaint(null);
                return;
              }

              // Otherwise update in-place
              setComplaints(prev =>
                prev.map(c => c.id === updated.id ? updated : c)
              );
              setSelectedComplaint(updated);
            }}
          />
        </div>

      </div>
    </div>
  );
}