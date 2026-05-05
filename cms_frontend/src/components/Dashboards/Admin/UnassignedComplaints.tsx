import { useEffect, useState } from 'react';
import { api } from '../../../lib/api';

interface Complaint {
  id: string;
  title: string;
  category: string;
  assignedTo?: string;
}

interface Staff {
  email: string;
  name: string;
}

interface Props {
  complaints: Complaint[];
  setComplaints: React.Dispatch<React.SetStateAction<any[]>>;
  onSelect: (complaint: Complaint | null) => void;
}

export function UnassignedComplaints({
  complaints,
  setComplaints,
  onSelect,
}: Props) {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [selectedStaff, setSelectedStaff] = useState('');
  const [assigningId, setAssigningId] = useState<string | null>(null);

  useEffect(() => {
    api.get('/users/staff').then(res => {
      setStaff(res.data);
    });
  }, []);

  const assignComplaint = async (complaintId: string) => {
    if (!selectedStaff) {
      alert('Select a staff member first');
      return;
    }

    // ✅ Optimistic UI update (DO NOT remove complaint)
    setComplaints(prev =>
      prev.map(c =>
        c.id === complaintId
          ? { ...c, assignedTo: selectedStaff }
          : c
      )
    );

    onSelect(null);
    setAssigningId(null);

    // Fire API call in background
    api.put(`/complaints/${complaintId}/assign`, null, {
      params: { staff: selectedStaff },
    }).catch(() => {
      alert('Failed to assign complaint');
    });
  };

  return (
    <div className="bg-glass rounded-2xl p-6 shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        Unassigned Complaints
      </h2>

      <select
        value={selectedStaff}
        onChange={e => setSelectedStaff(e.target.value)}
        className="mb-4 px-4 py-2 rounded-lg border"
      >
        <option value="">Select Staff</option>
        {staff.map(s => (
          <option key={s.email} value={s.email}>
            {s.name}
          </option>
        ))}
      </select>

      {complaints.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No unassigned complaints
        </p>
      ) : (
        <ul className="space-y-3">
          {complaints.map(c => (
            <li
              key={c.id}
              onClick={() => onSelect(c)}
              className="flex justify-between items-center bg-white rounded-xl p-4 cursor-pointer hover:bg-gray-50"
            >
              <div>
                <p className="font-medium">{c.title}</p>
                <p className="text-sm text-gray-500">
                  {c.category}
                </p>
              </div>

              <button
                type="button"
                disabled={assigningId === c.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setAssigningId(c.id);
                  assignComplaint(c.id);
                }}
                className="px-4 py-2 rounded-lg bg-[color:var(--pastel-primary)] text-white disabled:opacity-60"
              >
                {assigningId === c.id ? 'Assigning…' : 'Assign'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
