import React, { useState, useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Feed from "./Feed";
import "./home.scss";

const Home = () => {
  // 1. State: tracks whether the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuthenticated = () => {
    fetch("/api/authenticated", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Authenticated check:", data);
        setIsLoggedIn(data.authenticated);
      })
      .catch((err) => console.error("Auth check failed:", err));
  };

  // 2. Check authentication on page load
  useEffect(() => {
    checkAuthenticated();
  }, []);

  // 3. Conditional rendering
  return (
    <div className="home-container">
      <h1>Home page react is working</h1>

      {isLoggedIn ? (
        <Feed />
      ) : (
        <>
          <Login onLoginSuccess={checkAuthenticated} />
          <Signup />
        </>
      )}
    </div>
  );
};

export default Home;
