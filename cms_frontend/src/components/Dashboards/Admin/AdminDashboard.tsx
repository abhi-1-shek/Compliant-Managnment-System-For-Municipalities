import { useEffect, useState } from 'react';
import { api } from '../../../lib/api';
import { AdminStats } from './AdminStats';
import { ComplaintPieChart } from './ComplaintPieCharts';
import { UnassignedComplaints } from './UnassignedComplaints';
import { AllComplaints } from './AllComplaints';
import { ComplaintDetailsPanel } from './ComplaintDetailsPanel';
import { useAuth } from '../../../contexts/AuthContext';

export function AdminDashboard() {
  const { signOut } = useAuth();

  const [stats, setStats] = useState<any>(null);
  const [complaints, setComplaints] = useState<any[]>([]);
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'unassigned' | 'all'>('unassigned');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/dashboard/admin'),
      api.get('/complaints/all'),
    ]).then(([statsRes, complaintsRes]) => {
      setStats(statsRes.data);
      setComplaints(complaintsRes.data);
    }).finally(() => setLoading(false));
  }, []);

  const unassignedComplaints = complaints.filter(
    c => !c.assignedTo
  );

  if (loading) {
    return <div className="p-10 text-center">Loading dashboard…</div>;
  }

  return (
    <div className="min-h-screen bg-app p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <img src="/logo.png" className="w-10 h-10 rounded-full" />
          <h1 className="text-2xl font-bold text-gray-800">
            Admin Dashboard
          </h1>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() =>
              setViewMode(prev =>
                prev === 'unassigned' ? 'all' : 'unassigned'
              )
            }
            className="px-4 py-2 rounded-xl bg-[color:var(--pastel-primary)] text-white"
          >
            {viewMode === 'unassigned'
              ? 'View All Complaints'
              : 'View Unassigned Complaints'}
          </button>

          <button
            onClick={signOut}
            className="px-4 py-2 rounded-xl bg-red-100 text-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Stats */}
      <AdminStats stats={stats} />

      {/* Graph + Details */}
      <div className="mt-8 grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-1">
          <ComplaintPieChart stats={stats} />
        </div>

        <div className="xl:col-span-3">
          <ComplaintDetailsPanel complaint={selectedComplaint} />
        </div>
      </div>

      {/* Complaints List */}
      <div className="mt-10">
        {viewMode === 'unassigned' ? (
          <UnassignedComplaints
            complaints={unassignedComplaints}
            setComplaints={setComplaints}
            onSelect={setSelectedComplaint}
          />
        ) : (
          <AllComplaints
            complaints={complaints}
            onSelect={setSelectedComplaint}
          />
        )}
      </div>
    </div>
  );
}
