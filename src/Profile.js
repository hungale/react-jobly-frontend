import React, { useState, useContext, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import UserContext from "./UserContext";
import axios from "axios";
import { BASE_URL } from "./JoblyApi";

function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const [formData, setFormData] = useState({});

  useEffect(function () {
    const { username, jobs, ...initialFormData } = user;
    setFormData(initialFormData);
  }, [user]);

  if (!user) {
    return <Redirect to="/login" />;
  }

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const _token = localStorage.getItem("_token");
    const updateUser = async (formData) => {
      try {
        const data = { ...formData, _token };
        if (!data.photo_url) {
          delete data.photo_url;
        }
        const res = await axios.patch(BASE_URL + `/users/${user.username}`, data);
        setUser(res.data.user);
        history.push("/companies");
      } catch (err) {
        if (typeof err.response.data.message === "string") {
          setErrors([err.response.data.message]);
        } else {
          setErrors(err.response.data.message);
        }
      }
    };
    updateUser(formData);
  };

  return (
    <div>
      <p>
        <b>Username:</b>
      </p>
      <p>{user.username}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="first_name">First Name</label>
        <input
          name="first_name"
          id="first_name"
          value={formData.first_name}
          onChange={handleChange}
        ></input>
        <label htmlFor="last_name">Last Name</label>
        <input
          name="last_name"
          id="last_name"
          value={formData.last_name}
          onChange={handleChange}
        ></input>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        ></input>
        <label htmlFor="photo_url">Photo URL</label>
        <input
          name="photo_url"
          id="photo_url"
          value={formData.photo_url}
          onChange={handleChange}
        ></input>
        <label htmlFor="password">Re-enter Password</label>
        <input
          name="password"
          id="password"
          type="password"
          onChange={handleChange}
        ></input>
        <button className="submitBtn">Edit!</button>
        {errors.map((err) => (
          <div>{err}</div>
        ))}
      </form>
    </div>
  );
}

export default Profile;
