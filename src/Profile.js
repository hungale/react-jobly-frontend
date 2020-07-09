import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "./UserContext";
import axios from "axios";
import { BASE_URL } from "./JoblyApi";

function Profile() {
  const user = useContext(UserContext);
  // const initialValues = {
  //   first_name: user.first_name,
  //   last_name: user.last_name,
  //   email: user.email,
  //   photo_url: user.photo_url,
  // };
  const [formData, setFormData] = useState(user);
  const history = useHistory();

  if (!user) {
    history.push("/");
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
        delete data.jobs
        await axios.patch(BASE_URL + `/users/${user.username}`, data);
      } catch (err) {
        console.log(err.response.data);
      }
    };
    updateUser(formData);
    history.push("/companies");
  };

  return (
    <div>
      <p>
        <b>Username:</b>
      </p>
      <p>{user && user.username}</p>
      <form onSubmit={handleSubmit}>
        {/* why does && throw warning here below?? */}
        <label htmlFor="first_name">First Name</label>
        <input
          name="first_name"
          id="first_name"
          value={formData && formData.first_name}
          onChange={handleChange}
        ></input>
        <label htmlFor="last_name">Last Name</label>
        <input
          name="last_name"
          id="last_name"
          value={formData && formData.last_name}
          onChange={handleChange}
        ></input>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          id="email"
          value={formData && formData.email}
          onChange={handleChange}
        ></input>
        <label htmlFor="photo_url">Photo URL</label>
        <input
          name="photo_url"
          id="photo_url"
          value={formData && formData.photo_url}
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
      </form>
    </div>
  );
}

export default Profile;
