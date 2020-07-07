import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./JoblyApi";

function Company() {
  const [company, setCompany] = useState({});
  const { company: handle } = useParams();

  useEffect(() => {
    const getCompany = async () => {
      const res = await JoblyApi.getCompany(handle);
      setCompany(res);
    };
    getCompany();
  }, [handle]);

  return (
    <div>
      <h3>{company.name}</h3>
      <p>{company.description}</p>
      <ul>
        {/* maybe add a spinner component instead */}
        {company.jobs && company.jobs.map((job) => (
          <li>{job.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Company;
