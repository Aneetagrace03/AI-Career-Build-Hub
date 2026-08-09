function Stats() {
  const stats = [
    {
      number: "10K+",
      title: "Students",
    },
    {
      number: "500+",
      title: "Companies",
    },
    {
      number: "95%",
      title: "Placement Success",
    },
    {
      number: "24/7",
      title: "AI Mentor",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-8">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition"
            >
              <h2 className="text-4xl font-bold text-blue-600">
                {item.number}
              </h2>

              <p className="mt-3 text-gray-600 font-medium">
                {item.title}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Stats;