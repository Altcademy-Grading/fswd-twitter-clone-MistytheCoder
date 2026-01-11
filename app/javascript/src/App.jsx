import React, { useState, useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Feed from "./Feed";
import "./home.scss";

const Home = () => {
  // 1. State: tracks whether the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 2. Check authentication on page load
  useEffect(() => {
    fetch("/api/authenticated")
      .then(res => res.json())
      .then(data => {
        console.log("Authenticated check:", data);
        setIsLoggedIn(data.authenticated);
      })
      .catch(err => console.error("Auth check failed:", err));
  }, []);

  // 3. Conditional rendering
  return (
    <div className="home-container">
      <h1>Home page react is working</h1>

      {isLoggedIn ? (
        <Feed />
      ) : (
        <>
          <Login onLoginSuccess={() => setIsLoggedIn(true)} />
          <Signup />
        </>
      )}
    </div>
  );
};

export default Home;
