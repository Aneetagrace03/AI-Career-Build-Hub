function StatsCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <p className="text-gray-500 text-lg">
        {title}
      </p>

      <h2
        className={`text-5xl font-bold mt-3 ${color}`}
      >
        {value}
      </h2>

    </div>
  );
}

export default StatsCard;