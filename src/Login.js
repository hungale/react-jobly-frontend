import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "./JoblyApi";
import { useHistory } from "react-router-dom";

const Login = ({ login }) => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const history = useHistory();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const getToken = async () => {
      const res = await axios.post(BASE_URL + "/login", formData);
      return res;
    };
    try {
      const res = await getToken();
      localStorage.setItem("_token", res.data.token);
      login();
      history.push("/");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input name="username" id="username" onChange={handleChange}></input>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          id="password"
          type="password"
          onChange={handleChange}
        ></input>
        <button className="submitBtn">Login!</button>
        <div>{error}</div>
      </form>
    </div>
  );
};

export default Login;
