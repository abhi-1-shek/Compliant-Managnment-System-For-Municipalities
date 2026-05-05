import { useEffect, useState } from 'react';
import { api } from '../../../lib/api';
import { useAuth } from '../../../contexts/AuthContext';
import { CitizenStats } from './CitizenStats';
import { MyComplaints } from './MyComplaints';
import { CitizenComplaintDetails } from './CitizenComplaintDetails';
import { NewComplaintModal } from './NewComplaintModel';
import { CitizenComplaintPieChart } from './CitizenComplaintPieChart';

export function CitizenDashboard() {
  const { signOut } = useAuth();

  const [complaints, setComplaints] = useState<any[]>([]);
  const [selectedComplaint, setSelectedComplaint] = useState<any | null>(null);
  const [showNewComplaint, setShowNewComplaint] = useState(false);

  useEffect(() => {
  api.get('/complaints/my').then(res => {
    const normalized = res.data.map((c: any) => ({
      ...c,
      id: c.id || c._id,
    }));
    setComplaints(normalized);
  });
}, []);
  return (
    <>
      <div className="min-h-screen bg-app p-8">

        <div className="flex justify-between items-center mb-8">
  <div className="flex items-center gap-3">
    <img src="/logo.png" className="w-10 h-10 rounded-full" />
    <h1 className="text-2xl font-bold text-gray-800">
      Citizen Dashboard
    </h1>
  </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowNewComplaint(true)}
              className="px-4 py-2 rounded-xl bg-[color:var(--pastel-primary)] text-white"
            >
              + New Complaint
            </button>

            <button
              onClick={signOut}
              className="px-4 py-2 rounded-xl bg-red-100 text-red-700"
            >
              Logout
            </button>
          </div>
        </div>

        
        <CitizenStats complaints={complaints} />

        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 flex flex-col gap-6">
  <CitizenComplaintPieChart complaints={complaints} />
  <MyComplaints
    complaints={complaints}
    selectedId={selectedComplaint?.id}
    onSelect={setSelectedComplaint}
  />
</div>

          <div className="lg:col-span-2">
            <CitizenComplaintDetails
  complaint={selectedComplaint}
  onFeedbackSubmitted={(complaintId) => {
    setComplaints(prev =>
      prev.filter(c => c.id !== complaintId)
    );
    setSelectedComplaint(null);
  }}
/>
          </div>
        </div>
      </div>

      
      {showNewComplaint && (
        <NewComplaintModal
          onClose={() => setShowNewComplaint(false)}
          onCreated={() => {
            api.get('/complaints/my')
              .then(res => setComplaints(res.data));
          }}
        />
      )}
    </>
  );
}