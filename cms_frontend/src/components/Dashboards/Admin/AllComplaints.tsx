interface Complaint {
  id: string;
  title: string;
  category: string;
  status: string;
  assignedTo?: string;
}

interface Props {
  complaints: Complaint[];
  onSelect: (complaint: Complaint) => void;
}

export function AllComplaints({ complaints, onSelect }: Props) {
  return (
    <div className="bg-glass rounded-2xl p-6 shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        All Complaints
      </h2>

      {complaints.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No complaints found
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
                <p className="font-medium text-gray-800">
                  {c.title}
                </p>
                <p className="text-sm text-gray-500">
                  {c.category}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <StatusBadge status={c.status} />
                <span className="text-xs text-gray-400">
                  {c.assignedTo ? 'Assigned' : 'Unassigned'}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-700',
    IN_PROGRESS: 'bg-blue-100 text-blue-700',
    RESOLVED: 'bg-green-100 text-green-700',
    REJECTED: 'bg-red-100 text-red-700',
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        colors[status] || 'bg-gray-100 text-gray-700'
      }`}
    >
      {status.replace('_', ' ')}
    </span>
  );
}
