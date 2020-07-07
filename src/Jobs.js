import React, { useEffect, useState } from "react";
import JoblyApi from "./JoblyApi";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(function () {
    async function getJobs() {
      const res = await JoblyApi.request("jobs");
      setJobs(res.jobs);
    }
    getJobs();
  }, []);

  return (
    <div className="Jobs">
      <ul>
        {jobs.length &&
          jobs.map((job) => (
            <div className="card">
              <li>{job.title}</li>
            </div>
          ))}
      </ul>
    </div>
  );
}

export default Jobs;
