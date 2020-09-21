import React, { useContext } from "react";
import UserContext from "./UserContext";

const Home = () => {
  const { user } = useContext(UserContext);
  return(
    <div>
      {!user && 
      <h5>(Feel free to use testuser/testuser login combo if you don't want to make an account!)</h5>
      }
      <h1>Jobly</h1>
      <h4>All the jobs in one convenient place</h4>
      <h2>Welcome Back{user && ` ${user.first_name}`}!</h2>
    </div>
  );
};

export default Home;