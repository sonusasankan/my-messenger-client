// pages/Login.js
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, AuthDispatchContext } from "../store";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authDispatch = useContext(AuthDispatchContext);
  const authState = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.isAuthenticated) {
      if (authState.user.isNewUser) {
        navigate("/network");
      } else {
        navigate("/chat");
      }
    }
  }, [authState, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        // Store the token in localStorage
        localStorage.setItem("token", data.token);

        // Dispatch the user data to the context
        authDispatch({ type: "SET_USER", payload: data.user });

        // Redirect to the /chat route
        navigate("/chat");
      } else {
        // Handle login errors
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="app-login">
      <div className="app-login-wrapper">
      <form className="app-login__form" onSubmit={handleSubmit}>
        <div className="app-input-group d-flex flex-column">
          <label htmlFor="user">Email</label>
          <input
            className="app-input-control"
            id="user"
            type="email"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="app-input-group  d-flex flex-column">
          <label htmlFor="password">Password</label>
          <input
            className="app-input-control"
            id="password"
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn--login" type="submit">Login</button>
      </form>
      <div className="app-login__cta">
        <p>New User? <a href="/register">Register now!</a></p>
      </div>
      </div>
    </div>
  );
};

export default Login;
