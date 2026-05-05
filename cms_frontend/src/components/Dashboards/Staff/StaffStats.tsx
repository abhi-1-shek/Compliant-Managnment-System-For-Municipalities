interface Complaint {
  status: string;
}

interface Props {
  complaints: Complaint[];
}

export function StaffStats({ complaints }: Props) {
  const total = complaints.length;
  const inProgress = complaints.filter(
    c => c.status === 'IN_PROGRESS'
  ).length;
  const resolved = complaints.filter(
    c => c.status === 'RESOLVED'
  ).length;
  const rejected = complaints.filter(
    c => c.status === 'REJECTED'
  ).length;

  const cards = [
    { label: 'Assigned', value: total },
    { label: 'In Progress', value: inProgress },
    { label: 'Resolved', value: resolved },
    { label: 'Rejected', value: rejected },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {cards.map(c => (
        <div
          key={c.label}
          className="bg-glass rounded-2xl p-6 shadow-md"
        >
          <p className="text-gray-500 text-sm">
            {c.label}
          </p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {c.value}
          </p>
        </div>
      ))}
    </div>
  );
}
