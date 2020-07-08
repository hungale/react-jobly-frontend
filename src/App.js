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
  const [user, setUser] = useState(null);
  
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
        setIsLoggedIn(false);
        logout();
      }
    }
  }, [isLoggedIn]);

  function logout() {
    localStorage.clear();
    setUser(null);
    setIsLoggedIn(false);
  }

  // QUESTION: ask if there's a cleaner implementation of this
  // QUESTION: useLocalStorage, useful for just checking local storage
  // QUESTION: last one is in Companies.js
  function login() {
    setIsLoggedIn(true);
    // const token = localStorage.getItem("_token");
    // const { username } = jwt.decode(token);
    // getUserInfo(username, token)
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} logout={logout} />
        <UserContext.Provider value={user}>
          <Routes login={login} />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
