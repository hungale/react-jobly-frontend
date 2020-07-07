import React, {useState} from "react";
import "./App.css";
import Navbar from "./Navbar";
import Routes from "./Routes";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  //logout function we can pass down to Navbar
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn}/>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
