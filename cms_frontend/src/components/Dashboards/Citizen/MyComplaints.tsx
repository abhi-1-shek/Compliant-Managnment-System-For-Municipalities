interface Complaint {
  id: string;
  title: string;
  category: string;
  status: string;
}

interface Props {
  complaints: Complaint[];
  selectedId?: string;
  onSelect: (c: Complaint) => void;
}

export function MyComplaints({ complaints, selectedId, onSelect }: Props) {
  if (complaints.length === 0) {
    return (
      <div className="bg-glass rounded-2xl p-6 shadow-md text-gray-500">
        You have not submitted any complaints yet.
      </div>
    );
  }

  return (
    <div className="bg-glass rounded-2xl p-6 shadow-md">
      <h2 className="text-lg font-semibold mb-4">My Complaints</h2>

      <ul className="space-y-3">
        {complaints.map(c => (
          <li
            key={c.id}
            onClick={() => onSelect(c)}
            className={`cursor-pointer rounded-xl p-4 bg-white border transition
              ${selectedId === c.id
                ? 'border-[color:var(--pastel-primary)]'
                : 'border-transparent hover:border-gray-200'}
            `}
          >
            <p className="font-medium">{c.title}</p>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{c.category}</span>
              <span>{c.status.replace('_', ' ')}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}