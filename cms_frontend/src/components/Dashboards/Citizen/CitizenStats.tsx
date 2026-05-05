interface Complaint {
  status: string;
}

interface Props {
  complaints: Complaint[];
}

export function CitizenStats({ complaints }: Props) {
  const count = (s: string) =>
    complaints.filter(c => c.status === s).length;

  const cards = [
    { label: 'Total', value: complaints.length },
    { label: 'Pending', value: count('PENDING') },
    { label: 'In Progress', value: count('IN_PROGRESS') },
    { label: 'Resolved', value: count('RESOLVED') },
    { label: 'Rejected', value: count('REJECTED') },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
      {cards.map(c => (
        <div key={c.label} className="bg-glass rounded-2xl p-6 shadow-md">
          <p className="text-gray-500 text-sm">{c.label}</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {c.value}
          </p>
        </div>
      ))}
    </div>
  );
}