import { useState } from 'react';
import { api } from '../../../lib/api';

interface Props {
  onClose: () => void;
  onCreated: () => void;
}

export function NewComplaintModal({ onClose, onCreated }: Props) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const submitComplaint = async () => {
    if (!title || !category || !description) {
      alert('All fields are required');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('description', description);
    if (image) formData.append('image', image);

    try {
      await api.post('/complaints/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      onCreated();
      onClose();
    } catch {
      alert('Failed to submit complaint');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          New Complaint
        </h2>

        <input
          className="w-full mb-3 px-4 py-2 rounded-lg border"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full mb-3 px-4 py-2 rounded-lg border"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <textarea
          className="w-full mb-3 px-4 py-2 rounded-lg border"
          rows={4}
          placeholder="Describe the issue"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="mb-4"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={submitComplaint}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-[color:var(--pastel-primary)] text-white"
          >
            {loading ? 'Submitting…' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
}