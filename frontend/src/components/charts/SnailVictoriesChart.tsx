import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  {
    snail: 'Turbo',
    victories: 2,
  },
  {
    snail: 'Rayo',
    victories: 1,
  },
  {
    snail: 'Flash',
    victories: 1,
  },
  {
    snail: 'Bolt',
    victories: 1,
  },
  {
    snail: 'Trueno',
    victories: 1,
  },
  {
    snail: 'Lento',
    victories: 0,
  },
];

function SnailVictoriesChart() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">
          Victorias por caracol
        </h3>

        <p className="text-sm text-slate-400">
          Resultados de las 6 carreras del día
        </p>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e293b"
            />

            <XAxis
              dataKey="snail"
              stroke="#94a3b8"
            />

            <YAxis
              allowDecimals={false}
              domain={[0, 6]}
              stroke="#94a3b8"
            />

            <Tooltip />

            <Bar
              dataKey="victories"
              name="Victorias"
              fill="#6366f1"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SnailVictoriesChart;