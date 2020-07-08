import React, { useState, useEffect } from "react";
import JoblyApi from "./JoblyApi";
import { v4 as uuid } from "uuid";
import { NavLink, Redirect } from "react-router-dom";
import "./Companies.css"

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  // if (!localStorage.getItem("_token")) {
  //    <Redirect exact to="/"/>
  // }
  useEffect(() => {
    const getCompanies = async () => {
      const res = await JoblyApi.request("companies");
      setCompanies(res.companies);
    };
    getCompanies();
  }, []);

  // search
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (evt) => {
    const { value } = evt.target;
    setSearchQuery(value);
  };
  const handleSearch = async (evt) => {
    evt.preventDefault();
    const res = await JoblyApi.request(`companies?search=${searchQuery}`);
    setCompanies(res.companies);
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

  const renderCompanies = () => {
    return (
      <ul>
        {companies.map((company) => {
          return (
            <div className="card">
              <li>
                <NavLink exact to={`/companies/${company.handle}`}>
                  <h4>{company.name}</h4>
                </NavLink>
                <p>{company.description}</p>
              </li>
            </div>
          );
        })}
      </ul>
    );
  };
  return (
    <div>
      {renderSearchBar()}
      <div className="cardContainer">
        {renderCompanies()}
      </div>
    </div>
  );
};

export default Companies;
