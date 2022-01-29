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

    if (e.target.value === "google") {
      try {
        const googleUrl = await axios.get("/api/google/url");
        return window.location.assign(googleUrl.data);
      } catch (err) {
        console.error(err);
        alert(err.request.response);
      }
    } else {
      try {
        const userData = {
          email: email,
          password: password,
        };

        await axios.post(`/api/user/${view}`, userData);
        await getLoggedIn();
        navigate("/home");
      } catch (err) {
        console.error(err);
        alert(err.request.response);
      }
    }
  };

  return (
    <div className="App">
      <h1>{view === "login" ? "Login Page" : "Sign Up Page"}</h1>
      <div className="login-form">
        <form onSubmit={Login}>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email Address"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button type="submit" value="email">{view === "login" ? "Login" : "Sign Up"}</button>
          <button type="submit" value="google" onClick={(e) => Login(e, true)} style={{ backgroundColor: "blue", marginLeft: "25px" }}>
            {view === "login" ? "Login with Google" : "Sign up with Google"}
          </button>
        </form>
      </div>
      <br />
      <br />
      <div>
        <button onClick={() => view === "login" ? setView("signup") : setView("login")}>
          {view === "login" ? "Don't have an account? Sign Up!" : "Already have an account? Login!"}
        </button>
      </div>
    </div>
  );
}
