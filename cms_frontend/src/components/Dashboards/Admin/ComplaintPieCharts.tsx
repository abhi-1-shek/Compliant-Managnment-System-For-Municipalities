import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface Props {
  stats: {
    pending: number;
    inProgress: number;
    resolved: number;
    rejected: number;
  };
}

const COLORS = [
  '#A2AADB', 
  '#C0C9EE', 
  '#898AC4', 
  '#F4B4B4', 
];

export function ComplaintPieChart({ stats }: Props) {
  const data = [
    { name: 'Pending', value: stats.pending },
    { name: 'In Progress', value: stats.inProgress },
    { name: 'Resolved', value: stats.resolved },
    { name: 'Rejected', value: stats.rejected },
  ];

  return (
    <div className="bg-glass rounded-2xl p-6 shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Complaint Graph
      </h2>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
  data={data}
  dataKey="value"
  nameKey="name"
  innerRadius={50}
  outerRadius={85}
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
