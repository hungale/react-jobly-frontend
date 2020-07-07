import React, { useState, useEffect } from "react";
import JoblyApi from "./JoblyApi";

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
        {companies.map(company => {
          return (
          <li>
            <h4>{company.name}</h4>
            <p>{company.description}</p>
          </li>
          )
        })
        }
      </ul>
    )
  };
  return (
    <div>
      <ul>
        {renderCompanies()}
      </ul>
    </div>
  );
};

export default Companies;