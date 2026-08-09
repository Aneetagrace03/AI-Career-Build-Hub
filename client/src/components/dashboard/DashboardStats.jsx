function DashboardStats({ jobs }) {
  const total = jobs.length;

  const applied = jobs.filter(
    (job) => job.status === "Applied"
  ).length;

  const interview = jobs.filter(
    (job) => job.status === "Interview"
  ).length;

  const offer = jobs.filter(
    (job) => job.status === "Offer"
  ).length;

  const rejected = jobs.filter(
    (job) => job.status === "Rejected"
  ).length;

  const stats = [
    {
      title: "Applications",
      value: total,
      color: "bg-blue-500",
    },
    {
      title: "Interviews",
      value: interview,
      color: "bg-yellow-500",
    },
    {
      title: "Offers",
      value: offer,
      color: "bg-green-500",
    },
    {
      title: "Rejected",
      value: rejected,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((item) => (
        <div
          key={item.title}
          className={`${item.color} text-white rounded-2xl p-6 shadow-lg`}
        >
          <h2 className="text-lg">{item.title}</h2>

          <p className="text-4xl font-bold mt-3">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default DashboardStats;