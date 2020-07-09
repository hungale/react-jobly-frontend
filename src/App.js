import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Routes from "./Routes";
import { BrowserRouter } from "react-router-dom";
import jwt from "jsonwebtoken";
import axios from "axios";
import { BASE_URL } from "./JoblyApi";
import UserContext from "./UserContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("_token"));
  const [user, setUser] = useState(localStorage.getItem("_token")? {} : null);
  
  // get the user on mount
  useEffect(() => {
    const token = localStorage.getItem("_token");
    const getUserInfo = async (username, _token) => {
      const res = await axios.get(BASE_URL + `/users/${username}`, {params:{_token}});
      setUser(res.data.user);
    };
    console.log("mount");
    if(token) {
      try {
        const { username } = jwt.decode(token);
        getUserInfo(username, token);
      } catch(err) {
        console.error("Username could not be decoded.", err);
        logout();
      }
    }
  }, [isLoggedIn]);

  function logout() {
    localStorage.clear();
    setUser(null);
    setIsLoggedIn(false);
  }

  
  function login() {
    setIsLoggedIn(true);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} logout={logout} />
        <UserContext.Provider value={{user, setUser}}>
          <Routes login={login} />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
