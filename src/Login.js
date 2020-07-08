import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "./JoblyApi";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({});
  // const [token, setToken] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log(formData);
    const login = async () => {
      console.log(BASE_URL + "/login");
      const res = await axios.post(BASE_URL + "/login", formData);
      return res;
    };
    // setSubmitting(true);
    try {
      const res = await login();
      console.log("res", res);
      localStorage.setItem("_token", res.data.token);
      history.push("/");
    } catch(err) {
      setError("Invalid credentials");
    }
    // setSubmitting(false);
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input name="username" id="username" onChange={handleChange}></input>
        <label htmlFor="password">Password</label>
        <input name="password" id="password" onChange={handleChange}></input>
        {submitting ? <button className="submitBtn" disabled>Login!</button> 
        : <button className="submitBtn">Login!</button> }
        
        <div>{error}</div>
      </form>
    </div>
  );
};

export default Login;