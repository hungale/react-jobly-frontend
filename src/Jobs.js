import React, { useEffect, useState, useContext } from "react";
import JoblyApi from "./JoblyApi";
import UserContext from "./UserContext";
import { Redirect } from "react-router-dom";
import { BASE_URL } from "./JoblyApi";
import axios from "axios";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [showingJobs, setShowingJobs] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumbers] = useState(1);

  useEffect(function () {
    async function getJobs() {
      const res = await JoblyApi.request("jobs");
      setJobs(res.jobs);
    }
    getJobs();
    setShowingJobs(jobs.slice(0, 10));
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
    setPageNumbers(1);
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
    const res = await axios.get(BASE_URL + `/users/${user.username}`, {
      params: data,
    });
    setUser(res.data.user);
  };

  const nextPage = () => {
    setPageNumbers((page) => page + 1);
  };
  const previousPage = () => {
    setPageNumbers((page) => page - 1);
  };

  return (
    <div>
      {renderSearchBar()}
      <div className="cardContainer">
        <ul>
          {jobs?.slice((pageNumber - 1) * 20, pageNumber * 20)?.map((job) => (
            <div className="card" key={job.id}>
              <h4>{job.title}</h4>
              <li>Salary: ${job.salary}</li>
              <li>Equity: {job.equity * 100}%</li>
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
          <button
            disabled={pageNumber <= 1}
            onClick={previousPage}
            className="previousPageBtn"
          >
            Previous Page
          </button>

          <button
            onClick={nextPage}
            disabled={pageNumber * 20 >= jobs.length}
            className="nextPageBtn"
          >
            Next Page
          </button>

          <div>Page: {pageNumber}</div>
        </ul>
      </div>
    </div>
  );
}

export default Jobs;
