import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "./JoblyApi";
import { useHistory } from 'react-router-dom';


function Signup({ login }) {
  const history = useHistory();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState([]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const register = async () => {
      const res = await axios.post(BASE_URL + "/users", formData);
      return res;
    };
    try {
      const res = await register();
      localStorage.setItem("_token", res.data.token);
      login();
      history.push('/');
    } catch (err) {
      if (typeof err.response.data.message === "string") {
        setErrors([err.response.data.message]);
      } else {
        setErrors(err.response.data.message);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h5>Note: Use testuser/testuser login combo if you don't want to make an account!)</h5>
        <label htmlFor="username">Username</label>
        <input name="username" id="username" onChange={handleChange}></input>
        <label htmlFor="password">Password</label>
        <input name="password" type="password" id="password" onChange={handleChange}></input>
        <label htmlFor="first_name">First Name</label>
        <input
          name="first_name"
          id="first_name"
          onChange={handleChange}
        ></input>
        <label htmlFor="last_name">Last Name</label>
        <input name="last_name" id="last_name" onChange={handleChange}></input>
        <label htmlFor="email">Email</label>
        <input name="email" id="email" onChange={handleChange}></input>
        <button className="submitBtn">Sign up!</button>
        {errors.map(err => <div>{err}</div>)}
      </form>
    </div>
  );
}

export default Signup;
