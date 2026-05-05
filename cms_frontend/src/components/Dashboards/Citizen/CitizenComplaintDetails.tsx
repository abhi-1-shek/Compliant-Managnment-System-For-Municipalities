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
}

interface Props {
  complaint: Complaint | null;
  onFeedbackSubmitted: (complaintId: string) => void;
}

export function CitizenComplaintDetails({
  complaint,
  onFeedbackSubmitted,
}: Props) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setRating(5);
    setComment('');
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

  const canGiveFeedback =
    complaint.status === 'RESOLVED' ||
    complaint.status === 'REJECTED';

  const canDelete = complaint.status === 'PENDING';

  const deleteComplaint = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this complaint?'
    );
    if (!confirmed) return;

    try {
      await api.delete(`/complaints/${complaint.id}`);
      alert('Complaint deleted successfully');
      onFeedbackSubmitted(complaint.id);
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Failed to delete complaint');
    }
  };

  const submitFeedback = async () => {
    if (!canGiveFeedback) return;

    setSubmitting(true);
    try {
      await api.post('/feedback/submit', {
        complaintId: complaint.id,
        rating,
        feedbackText: comment,
      });

      alert('Thank you for your feedback!');
      onFeedbackSubmitted(complaint.id);
    } catch (err: any) {
      alert(err?.message || 'Failed to submit feedback');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-glass rounded-2xl p-6 shadow-md h-full flex flex-col gap-6">
      
 
      <div>
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {complaint.title}
          </h2>

          <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            {complaint.status.replace('_', ' ')}
          </span>
        </div>

        <p className="text-sm text-gray-500 mt-1">
          Category: {complaint.category}
        </p>
      </div>

   
      <div>
        <p className="text-xs text-gray-500 mb-1">Description</p>
        <div className="bg-white rounded-xl p-4 text-sm text-gray-700 leading-relaxed">
          {complaint.description}
        </div>
      </div>

    
      {complaint.imageUrl && (
        <div>
          <p className="text-xs text-gray-500 mb-2">Attached Image</p>
          <div className="w-full aspect-video bg-gray-100 rounded-xl overflow-hidden">
            <img
              src={`${API_URL}/${complaint.imageUrl}`}
              alt="Complaint evidence"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

   
      {canDelete && (
        <div className="border-t pt-6">
          <button
            onClick={deleteComplaint}
            className="px-4 py-2 rounded-xl bg-red-100 text-red-700 text-sm hover:bg-red-200"
          >
            Delete Complaint
          </button>
        </div>
      )}

      {/* FEEDBACK */}
      {canGiveFeedback && (
        <div className="border-t pt-6">
          <h3 className="font-semibold text-gray-800 mb-4">
            How was this complaint handled?
          </h3>

          <label className="text-sm text-gray-500 block mb-1">Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full mb-4 px-4 py-2 rounded-xl border bg-white text-sm"
          >
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>

          <label className="text-sm text-gray-500 block mb-1">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border mb-4 text-sm"
            rows={3}
            placeholder="Share your experience (optional)"
          />

          <button
            onClick={submitFeedback}
            disabled={submitting || !comment.trim()}
            className="px-4 py-2 rounded-xl bg-[color:var(--pastel-primary)] text-white text-sm disabled:opacity-60"
          >
            {submitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </div>
      )}
    </div>
  );
}