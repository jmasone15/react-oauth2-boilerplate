import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState("login");
  const { getLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  async function Login(e) {
    e.preventDefault();

    try {
      const loginData = {
        email: email,
        password: password,
      };

      await axios.post("/api/user/login", loginData);
      await getLoggedIn();
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert(err.request.response);
    }
  }

  return (
    <div className="App">
      <h1>Login Page</h1>
      <div className="login-form">
        <form onSubmit={Login}>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email Address"
            autoComplete="email"
            autoFocus
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            autoFocus
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
