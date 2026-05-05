import { useState } from 'react';
import { api } from '../../../lib/api';

export function CitizenFeedback({
  complaintId,
  onSubmitted,
}: {
  complaintId: string;
  onSubmitted: () => void;
}) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      await api.post('/feedback/submit', {
        complaintId,
        rating,
        feedbackText: text,
      });
      onSubmitted();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 bg-white rounded-xl p-4 shadow-sm">
      <h3 className="font-semibold mb-3">Feedback</h3>

      <label className="text-sm">Rating</label>
      <select
        value={rating}
        onChange={e => setRating(+e.target.value)}
        className="w-full mt-1 px-3 py-2 border rounded-lg"
      >
        {[5,4,3,2,1].map(r => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>

      <label className="text-sm mt-3 block">Comment</label>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
        rows={3}
      />

      <button
        onClick={submit}
        disabled={loading}
        className="mt-4 px-4 py-2 rounded-xl bg-[color:var(--pastel-primary)] text-white"
      >
        {loading ? 'Submitting…' : 'Submit Feedback'}
      </button>
    </div>
  );
}