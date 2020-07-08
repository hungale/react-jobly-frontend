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

  // search
  const [searchQuery, setSearchQuery] = useState("");
  const handleChange = (evt) => {
    const { value } = evt.target;
    setSearchQuery(value);
  };
  const handleSearch = async (evt) => {
    evt.preventDefault();
    const res = await JoblyApi.request(`jobs?search=${searchQuery}`);
    setJobs(res.jobs);
  }
  
  // make it its own component
  const renderSearchBar = () => {
    return (
      <form onSubmit={handleSearch} className="search">
        <input id="search" 
             onChange={handleChange} 
             placeholder="Enter search term..."/>
        <button className="searchBtn">Search</button>
      </form>
    );
  };

  return (
    <div>
      {renderSearchBar()}
      <div className="cardContainer">
        <ul>
          {jobs.length &&
            jobs.map((job) => (
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

export default Jobs;
