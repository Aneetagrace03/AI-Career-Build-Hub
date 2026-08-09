import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

function DashboardAnalytics({ stats }) {
  const pieData = [
    { name: "Jobs", value: stats.totalJobs },
    { name: "Placements", value: stats.totalPlacements },
    { name: "Interviews", value: stats.totalInterviews },
    { name: "Selected", value: stats.totalSelected },
  ];

  const barData = [
    {
      name: "Career Progress",
      Jobs: stats.totalJobs,
      Placements: stats.totalPlacements,
      Interviews: stats.totalInterviews,
      Selected: stats.totalSelected,
    },
  ];

  const COLORS = [
    "#2563eb",
    "#22c55e",
    "#f59e0b",
    "#9333ea",
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-8 mt-10">
      {/* Pie Chart */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-6">
          Placement Overview
        </h2>

        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={110}
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-6">
          Career Analytics
        </h2>

        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar dataKey="Jobs" fill="#2563eb" />
            <Bar dataKey="Placements" fill="#22c55e" />
            <Bar dataKey="Interviews" fill="#f59e0b" />
            <Bar dataKey="Selected" fill="#9333ea" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DashboardAnalytics;