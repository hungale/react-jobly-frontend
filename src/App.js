import React from 'react';
import './App.css';
import Navbar from "./Navbar";
import Routes from "./Routes";
import { BrowserRouter } from 'react-router-dom';
import JoblyApi from "./JoblyApi";


function App() {
  // const request = async () => {
  //   const res = await JoblyApi.request("jobs");
  //   console.log(res);
  // };
  // request();
  // const getCompany = async (handle) => {
  //   const res = await JoblyApi.getCompany(handle);
  //   console.log(res);
  // };
  // getCompany("ayala-buchanan");

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes/>
      </BrowserRouter>

    </div>
  );
}

export default App;
