import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const data = [
  {
    name: 'Ganadas',
    value: 18,
  },
  {
    name: 'Perdidas',
    value: 12,
  },
];

const COLORS = ['#6366f1', '#334155'];

function BetsChart() {
  const totalBets = data.reduce((total, item) => total + item.value, 0);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">
          Resultado de apuestas
        </h3>

        <p className="text-sm text-slate-400">
          Resumen de apuestas simuladas
        </p>
      </div>

      <div className="relative h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={75}
              outerRadius={105}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-3xl font-bold text-white">
              {totalBets}
            </p>

            <p className="text-xs text-slate-500">
              apuestas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BetsChart;