// pages/Register.js
import React, { useState, useContext } from 'react';
import { AuthContext, AuthDispatchContext, UserDispatchContext } from '../store';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const authDispatch = useContext(AuthDispatchContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username,
            email,
            password,
            profilePicture
          })
        });
        const newUser = await response.json();
        authDispatch({ type: 'REGISTER_SUCCESS', payload: newUser });
        UserDispatchContext({ type: 'SET_USER', payload: newUser });
      } catch (error) {
        authDispatch({ type: 'REGISTER_FAILURE', payload: error });
      }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Profile Picture URL"
        value={profilePicture}
        onChange={(e) => setProfilePicture(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
