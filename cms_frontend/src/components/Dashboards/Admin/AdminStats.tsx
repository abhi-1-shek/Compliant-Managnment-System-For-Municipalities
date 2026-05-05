interface Props {
  stats: {
    totalComplaints: number;
    pending: number;
    inProgress: number;
    resolved: number;
    rejected: number;
  };
}

export function AdminStats({ stats }: Props) {
  const cards = [
    { label: 'Total', value: stats.totalComplaints },
    { label: 'Pending', value: stats.pending },
    { label: 'In Progress', value: stats.inProgress },
    { label: 'Resolved', value: stats.resolved },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {cards.map(c => (
        <div
          key={c.label}
          className="bg-glass rounded-2xl p-6 shadow-md"
        >
          <p className="text-gray-500 text-sm">{c.label}</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {c.value}
          </p>
        </div>
      ))}
    </div>
  );
}
