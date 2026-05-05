import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface Complaint {
  status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED' | 'REJECTED';
}

interface Props {
  complaints: Complaint[];
}

const COLORS = [
  '#A2AADB', 
  '#C0C9EE',
  '#898AC4', 
  '#F4B4B4', 
];

export function StaffComplaintPieChart({ complaints }: Props) {
  const count = (status: string) =>
    complaints.filter(c => c.status === status).length;

  const data = [
    { name: 'Pending', value: count('PENDING') },
    { name: 'In Progress', value: count('IN_PROGRESS') },
    { name: 'Resolved', value: count('RESOLVED') },
    { name: 'Rejected', value: count('REJECTED') },
  ].filter(d => d.value > 0); // hide zero slices

  if (data.length === 0) {
    return (
      <div className="bg-glass rounded-2xl p-6 shadow-md text-gray-500 text-sm">
        No assigned complaints yet.
      </div>
    );
  }

  return (
    <div className="bg-glass rounded-2xl p-6 shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Assigned Complaints Overview
      </h2>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={55}
            outerRadius={90}
            paddingAngle={4}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            formatter={(value) => (
              <span className="text-sm text-gray-600">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}