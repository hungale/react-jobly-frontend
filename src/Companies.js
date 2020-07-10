import React, { useState, useEffect, useContext } from "react";
import JoblyApi from "./JoblyApi";
import { NavLink, Redirect } from "react-router-dom";
import "./Companies.css";
import UserContext from "./UserContext";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const { user } = useContext(UserContext);
  const [pageNumber, setPageNumbers] = useState(1);

  // search
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const getCompanies = async () => {
      const res = await JoblyApi.request("companies");
      setCompanies(res.companies);
    };
    getCompanies();
  }, []);

  if (!user) {
    return <Redirect to="/login" />;
  }

  const handleChange = (evt) => {
    const { value } = evt.target;
    setSearchQuery(value);
  };
  const handleSearch = async (evt) => {
    evt.preventDefault();
    const res = await JoblyApi.request(`companies?search=${searchQuery}`);
    setCompanies(res.companies);
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
  const nextPage = () => {
    setPageNumbers((page) => page + 1);
  };
  const previousPage = () => {
    setPageNumbers((page) => page - 1);
  };

  const renderCompanies = () => {
    return (
      <ul>
        {companies
          ?.slice((pageNumber - 1) * 10, pageNumber * 10)
          ?.map((company) => {
            return (
              <div className="card" key={company.handle}>
                <li>
                  <NavLink exact to={`/companies/${company.handle}`}>
                    <h4>{company.name}</h4>
                  </NavLink>
                  <p>{company.description}</p>
                </li>
              </div>
            );
          })}
        <button
          disabled={pageNumber <= 1}
          onClick={previousPage}
          className="previousPageBtn"
        >
          Previous Page
        </button>

        <button
          onClick={nextPage}
          disabled={pageNumber * 10 >= companies.length}
          className="nextPageBtn"
        >
          Next Page
        </button>

        <div>Page: {pageNumber}</div>
      </ul>
    );
  };
  return (
    <div>
      {renderSearchBar()}
      <div className="cardContainer">{renderCompanies()}</div>
    </div>
  );
};

export default Companies;
