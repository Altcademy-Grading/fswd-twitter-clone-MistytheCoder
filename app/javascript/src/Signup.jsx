import React, { useState } from "react";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        user: {
          username,
          email,
          password,
        },
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          const errors = Array.isArray(data.errors) ? data.errors.join(", ") : "Signup failed";
          throw new Error(errors);
        }
        return data;
      })
      .then(() => {
        setMessage("Signup successful. You can now log in.");
        setUsername("");
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        setMessage(err.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>

      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit">Create Account</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default Signup;
