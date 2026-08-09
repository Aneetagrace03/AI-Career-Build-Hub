import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ApplicationsChart({ jobs }) {
  const data = [
    {
      name: "Applied",
      value: jobs.filter(
        (job) => job.status === "Applied"
      ).length,
    },
    {
      name: "Interview",
      value: jobs.filter(
        (job) => job.status === "Interview"
      ).length,
    },
    {
      name: "Offer",
      value: jobs.filter(
        (job) => job.status === "Offer"
      ).length,
    },
    {
      name: "Rejected",
      value: jobs.filter(
        (job) => job.status === "Rejected"
      ).length,
    },
  ];

  const COLORS = [
    "#3B82F6",
    "#FACC15",
    "#22C55E",
    "#EF4444",
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-5">
        Application Status
      </h2>

      <ResponsiveContainer width="100%" height={320}>

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            outerRadius={110}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}

export default ApplicationsChart;