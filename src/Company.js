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
      <div className="cardContainer">
        <ul>
          {/* maybe add a spinner component instead */}
          {company.jobs && company.jobs.map((job) => (
            <div className="card">
              <li>
                <h4>
                  {job.title}
                </h4>
                <li>Salary: ${job.salary}</li>
                <li>Equity: {job.equity}%</li>
                <div className="apply">
                  <button className="applyBtn">Apply</button>
                </div>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Company;
