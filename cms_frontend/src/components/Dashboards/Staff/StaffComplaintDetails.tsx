import { useEffect, useState } from 'react';
import { api } from '../../../lib/api';

const API_URL = 'http://localhost:8080';

interface Complaint {
  id: string;
  title: string;
  category: string;
  status: string;
  description: string;
  imageUrl?: string;
  createdBy?: {
    email: string;
  };
}

interface Props {
  complaint: Complaint | null;
  onStatusUpdated: (updated: Complaint) => void;
}

export function StaffComplaintDetails({
  complaint,
  onStatusUpdated,
}: Props) {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (complaint) {
      setStatus(complaint.status);
    }
  }, [complaint]);

  if (!complaint) {
    return (
      <div className="bg-glass rounded-2xl p-10 shadow-md h-full flex items-center justify-center">
        <p className="text-gray-400 text-sm">
          Select a complaint to view details
        </p>
      </div>
    );
  }

  const updateStatus = async () => {
    if (status === complaint.status) return;

    setLoading(true);
    try {
      const res = await api.put(
        `/complaints/${complaint.id}/status`,
        { status }
      );
      onStatusUpdated(res.data);
    } catch {
      alert('Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-glass rounded-2xl p-6 shadow-md h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-6">
        Complaint Details
      </h2>

      {/* TOP SECTION: DETAILS + IMAGE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

        {/* LEFT COLUMN */}
        <div className="space-y-4 text-sm">
          <Detail label="Title" value={complaint.title} />
          <Detail label="Category" value={complaint.category} />
          <Detail label="Status" value={complaint.status} />
          <Detail
            label="Submitted By"
            value={complaint.createdBy?.email || 'Unknown'}
          />

          {/* UPDATE STATUS */}
          <div className="pt-2">
            <p className="text-gray-500 text-xs mb-1">
              Update Status
            </p>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border bg-white text-sm"
            >
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
              <option value="REJECTED">Rejected</option>
            </select>

            <button
              onClick={updateStatus}
              disabled={loading || status === complaint.status}
              className="mt-3 px-4 py-2 rounded-xl bg-[color:var(--pastel-primary)] text-white text-sm disabled:opacity-60"
            >
              {loading ? 'Updating…' : 'Update Status'}
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN — IMAGE */}
        <div>
          <p className="text-sm text-gray-500 mb-2">
            Attached Image
          </p>

          {complaint.imageUrl ? (
            <div className="bg-white rounded-xl p-3 shadow-sm">
              <img
                src={`${API_URL}/${complaint.imageUrl}`}
                alt="Complaint evidence"
                className="w-full h-64 object-cover rounded-lg"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center bg-white rounded-xl text-gray-400 text-sm">
              No image attached
            </div>
          )}
        </div>
      </div>

      {/* DESCRIPTION — FULL WIDTH & CLOSE */}
      <div className="mt-6">
        <p className="text-sm text-gray-500 mb-1">
          Description
        </p>
        <div className="bg-white rounded-xl p-4 text-sm text-gray-700 leading-relaxed">
          {complaint.description || 'No description provided'}
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-gray-500 text-xs">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  );
}