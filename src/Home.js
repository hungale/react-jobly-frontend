import React, { useContext } from "react";
import UserContext from "./UserContext";

const Home = () => {
  const { user } = useContext(UserContext);
  return(
    <div>
      <h1>Jobly</h1>
      <h4>All the jobs in one convenient place</h4>
      <h2>Welcome Back{user && ` ${user.first_name}`}!</h2>
    </div>
  );
};

export default Home;