function JobStats({ jobs }) {
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

  const cards = [
    {
      title: "Applied",
      value: applied,
      color: "bg-blue-600",
    },
    {
      title: "Interview",
      value: interview,
      color: "bg-yellow-500",
    },
    {
      title: "Offer",
      value: offer,
      color: "bg-green-600",
    },
    {
      title: "Rejected",
      value: rejected,
      color: "bg-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`${card.color} text-white rounded-2xl p-6 shadow-lg`}
        >
          <h2 className="text-lg">{card.title}</h2>

          <p className="text-4xl font-bold mt-3">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default JobStats;