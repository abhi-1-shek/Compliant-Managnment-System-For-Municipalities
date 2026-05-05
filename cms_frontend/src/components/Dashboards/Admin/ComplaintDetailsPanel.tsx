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
  userId?: string;
  assignedTo?: string;
}

interface Feedback {
  id: string;
  submittedBy: string;
  rating: number;
  feedbackText: string;
}

interface Props {
  complaint: Complaint | null;
}

export function ComplaintDetailsPanel({ complaint }: Props) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loadingFeedback, setLoadingFeedback] = useState(false);

  useEffect(() => {
    if (!complaint?.id) return;

    setLoadingFeedback(true);
    api
      .get(`/feedback/complaint/${complaint.id}`)
      .then(res => setFeedbacks(res.data))
      .catch(() => setFeedbacks([]))
      .finally(() => setLoadingFeedback(false));
  }, [complaint?.id]);

  if (!complaint) {
    return (
      <div className="bg-glass rounded-2xl p-10 shadow-md h-full flex items-center justify-center">
        <p className="text-gray-400 text-sm">
          Select a complaint to view details
        </p>
      </div>
    );
  }

  return (
    <div className="bg-glass rounded-2xl p-6 shadow-md h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-6">
        Complaint Details
      </h2>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        <div className="space-y-4 text-sm">
          <Detail label="Title" value={complaint.title} />
          <Detail label="Category" value={complaint.category} />
          <Detail label="Status" value={complaint.status} />
          <Detail label="Submitted By" value={complaint.userId || 'Unknown'} />
          <Detail
            label="Assigned To"
            value={complaint.assignedTo || 'Not assigned'}
          />
        </div>

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
              />
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center bg-white rounded-xl text-gray-400 text-sm">
              No image attached
            </div>
          )}
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="mt-6">
        <p className="text-sm text-gray-500 mb-3">
          Description
        </p>
        <div className="bg-white rounded-xl p-4 text-sm text-gray-700 leading-relaxed">
          {complaint.description || 'No description provided'}
        </div>
      </div>

      <div className="my-6 border-t border-gray-200" />
      <div className="mt-6">
        <p className="text-sm text-gray-500 mb-3">
          Citizen Feedback
        </p>

        {loadingFeedback && (
          <p className="text-sm text-gray-400">
            Loading feedback…
          </p>
        )}

        {!loadingFeedback && feedbacks.length === 0 && (
          <div className="bg-white rounded-xl p-4 text-sm text-gray-400">
            No feedback submitted yet.
          </div>
        )}

        {!loadingFeedback && feedbacks.length > 0 && (
          <div className="space-y-4">
            {feedbacks.map(f => (
              <div
                key={f.id}
                className="bg-white rounded-xl p-4 border"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium text-gray-800">
                    {f.submittedBy}
                  </p>

                  <span className="px-3 py-1 rounded-full text-xs bg-gray-100">
                    ⭐ {f.rating} / 5
                  </span>
                </div>

                <p className="text-sm text-gray-700 leading-relaxed">
                  {f.feedbackText}
                </p>
              </div>
            ))}
          </div>
        )}
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