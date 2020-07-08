import React, {useState} from "react";
import "./App.css";
import Navbar from "./Navbar";
import Routes from "./Routes";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function logout() {
    localStorage.clear();
    setIsLoggedIn(false);
  }

  function login() {
    setIsLoggedIn(true);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} logout={logout} />
        <Routes login={login} />
      </BrowserRouter>
    </div>
  );
}

export default App;
