import React, { useEffect, useState, useContext } from "react";
import JoblyApi from "./JoblyApi";
import UserContext from "./UserContext";
import { useHistory, Redirect } from "react-router-dom";
import { BASE_URL } from "./JoblyApi";
import axios from "axios";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState("");
  const history = useHistory();

  useEffect(function () {
    async function getJobs() {
      const res = await JoblyApi.request("jobs");
      setJobs(res.jobs);
    }
    getJobs();
  }, []);

  if (!user) {
    return <Redirect to="/login" />;
  }

  // search
  const handleChange = (evt) => {
    const { value } = evt.target;
    setSearchQuery(value);
  };
  const handleSearch = async (evt) => {
    evt.preventDefault();
    const res = await JoblyApi.request(`jobs?search=${searchQuery}`);
    setJobs(res.jobs);
  };

  // make it its own component
  const renderSearchBar = () => {
    return (
      <form onSubmit={handleSearch} className="search">
        <input
          id="search"
          onChange={handleChange}
          placeholder="Enter search term..."
        />
        <button className="searchBtn">Search</button>
      </form>
    );
  };

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
      {renderSearchBar()}
      <div className="cardContainer">
        <ul>
          {jobs.length &&
            jobs.map((job) => (
              <div className="card">
                <h4>{job.title}</h4>
                <li>Salary: ${job.salary}</li>
                <li>Equity: {job.equity}%</li>
                <div className="apply">
                  {user?.jobs?.filter((applied) => applied.id === job.id).length >
                  0 ? (
                    <button
                      onClick={() => applyToJob(job.id)}
                      className="appliedBtn"
                      disabled
                    >
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
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Jobs;
