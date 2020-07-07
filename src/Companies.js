import React, { useState, useEffect } from "react";
import JoblyApi from "./JoblyApi";
import { v4 as uuid } from "uuid";
import { NavLink } from "react-router-dom";
import "./Companies.css"

const Companies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const getCompanies = async () => {
      const res = await JoblyApi.request("companies");
      setCompanies(res.companies);
    };
    getCompanies();
  }, []);

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
    <div className="Companies">
      {renderCompanies()}
    </div>
  );
};

export default Companies;
