function RecentActivity({ jobs }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        Recent Applications
      </h2>

      {jobs.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        jobs
          .slice()
          .reverse()
          .slice(0, 5)
          .map((job) => (
            <div
              key={job._id}
              className="border-b py-4"
            >
              <h3 className="font-bold">
                {job.company}
              </h3>

              <p>{job.role}</p>

              <p className="text-gray-500">
                {job.status}
              </p>
            </div>
          ))
      )}

    </div>
  );
}

export default RecentActivity;