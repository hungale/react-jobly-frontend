import React, { useState } from "react";

function Signup() {
  const [formData, setFormData] = useState({});

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  return (
    <div>
      <form>
        <label htmlFor="username">Username</label>
        <input name="username" id="username" onChange={handleChange}></input>
        <label htmlFor="password">Password</label>
        <input name="password" id="password" onChange={handleChange}></input>
        <label htmlFor="firstName">First Name</label>
        <input name="firstName" id="firstName" onChange={handleChange}></input>
        <label htmlFor="lastName">Last Name</label>
        <input name="lastName" id="lastName" onChange={handleChange}></input>
        <label htmlFor="email">Email</label>
        <input name="email" id="email" onChange={handleChange}></input>
        <button className="submitBtn">Sign up!</button>
      </form>
    </div>
  );
}

export default Signup;
