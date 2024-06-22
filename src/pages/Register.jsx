// pages/Register.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  AuthContext,
  AuthDispatchContext,
  UserDispatchContext,
} from "../store";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const authDispatch = useContext(AuthDispatchContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          profilePicture,
        }),
      });
      const newUser = await response.json();
      authDispatch({ type: "REGISTER_SUCCESS", payload: newUser });
      UserDispatchContext({ type: "SET_USER", payload: newUser });
      navigate("/");
    } catch (error) {
      authDispatch({ type: "REGISTER_FAILURE", payload: error });
    }
  };

  return (
    <div className="app-login">
      <div className="app-login-wrapper">
        <form className="app-login__form" onSubmit={handleSubmit}>
          <div className="app-input-group d-flex flex-column">
            <label htmlFor="username">Username</label>
            <input
              className="app-input-control"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="app-input-group d-flex flex-column">
            <label htmlFor="email">Email</label>
            <input
              className="app-input-control"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="app-input-group d-flex flex-column">
            <label htmlFor="password">Password</label>
            <input
              className="app-input-control"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* <div className="app-input-group d-flex flex-column">
            <label htmlFor="profilepicture">Profile picture</label>
            <input
              className="app-input-control"
              id="profilepicture"
              type="text"
              placeholder="Profile Picture URL"
              value={profilePicture}
              onChange={(e) => setProfilePicture(e.target.value)}
            />
          </div> */}
          <button className="btn btn--login" type="submit">Register</button>
        </form>
        <div className="app-login__cta">
        <p>Already a user? <a href="/login">Login!</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
