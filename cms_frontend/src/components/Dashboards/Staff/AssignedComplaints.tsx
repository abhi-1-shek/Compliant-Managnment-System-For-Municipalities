interface Complaint {
  id: string;
  title: string;
  category: string;
  status: string;
}

interface Props {
  complaints: Complaint[];
  onSelect: (complaint: Complaint) => void;
  selectedId?: string;
}

export function AssignedComplaints({
  complaints,
  onSelect,
  selectedId,
}: Props) {

  if (complaints.length === 0) {
    return (
      <div className="bg-glass rounded-2xl p-6 shadow-md text-sm text-gray-500">
        No complaints assigned to you.
      </div>
    );
  }

  return (
    <div className="bg-glass rounded-2xl p-6 shadow-md">
      <h2 className="text-lg font-semibold mb-4">
        Assigned Complaints
      </h2>

      <ul className="space-y-3">
        {complaints.map((c) => {
          const isSelected = c.id === selectedId;

          return (
            <li
              key={c.id}
              onClick={() => onSelect(c)}
              className={`cursor-pointer rounded-xl p-4 border transition
                ${
                  isSelected
                    ? 'border-[color:var(--pastel-primary)] bg-white'
                    : 'border-transparent bg-white hover:border-gray-200'
                }
              `}
            >
              <p className="font-medium text-gray-800">
                {c.title}
              </p>

              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-gray-500">
                  {c.category}
                </span>

                <StatusBadge status={c.status} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}


function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-700',
    IN_PROGRESS: 'bg-blue-100 text-blue-700',
    RESOLVED: 'bg-green-100 text-green-700',
    REJECTED: 'bg-red-100 text-red-700',
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${
        styles[status] || 'bg-gray-100 text-gray-600'
      }`}
    >
      {status.replace('_', ' ')}
    </span>
  );
}
