import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./JoblyApi";
import UserContext from "./UserContext";
import { BASE_URL } from "./JoblyApi";
import axios from "axios";

function Company() {
  const { user, setUser } = useContext(UserContext);
  const [company, setCompany] = useState({});
  const { company: handle } = useParams();

  useEffect(() => {
    const getCompany = async () => {
      const res = await JoblyApi.getCompany(handle);
      setCompany(res);
    };
    getCompany();
  }, [handle]);

  const applyToJob = async (id) => {
    const data = {};
    data._token = localStorage.getItem("_token");
    await axios.post(BASE_URL + `/jobs/${id}/apply`, data);
    let res = await axios.get(BASE_URL + `/users/${user.username}`, {
      params: data,
    });
    setUser(res.data.user);
  };

  return (
    <div>
      <h3>{company.name}</h3>
      <p>{company.description}</p>
      <div className="cardContainer">
        <ul>
          {/* maybe add a spinner component instead */}
          {company.jobs &&
            company.jobs.map((job) => (
              <div className="card">
                <li>
                  <h4>{job.title}</h4>
                  <li>Salary: ${job.salary}</li>
                  <li>Equity: {job.equity}%</li>
                  <div className="apply">
                    {user && user.jobs.filter((applied) => applied.id === job.id)
                      .length > 0 ? (
                      <button className="appliedBtn" disabled>
                        Applied
                      </button>
                    ) : (
                      <button
                        onClick={() => applyToJob(job.id)}
                        className="applyBtn"
                      >
                        Apply
                      </button>
                    )}
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
