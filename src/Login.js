import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  };
  
  return (
    <div>
      <form>
        <label htmlFor="username">Username</label>
        <input name="username" id="username" onChange={handleChange}></input>
        <label htmlFor="password">Password</label>
        <input name="password" id="password" onChange={handleChange}></input>
        <button className="submitBtn">Login!</button>
      </form>
    </div>
  );
};

export default Login;