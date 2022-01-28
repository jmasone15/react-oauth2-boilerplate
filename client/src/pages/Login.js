import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState("login");
  const { getLoggedIn } = useContext(AuthContext);
  const [google, setGoogle] = useState(false);
  const navigate = useNavigate();

  async function Login(e) {
    e.preventDefault();

    if (google) {
      try {
        const googleUrl = await axios.get("/api/google/url");
        return window.location.assign(googleUrl.data);
      } catch (err) {
        console.error(err);
        alert(err.request.response);
      }
    }

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
  };

  async function SignUp(e) {
    e.preventDefault();

    if (google) {
      return console.log("test")
    }

    try {
      const signUpData = {
        email: email,
        password: password
      };

      await axios.post("/api/user/signup", signUpData);
      await getLoggedIn();
    } catch (err) {
      console.error(err);
      alert(err.request.response);
    }
  }

  return (
    <>
      {view === "login" && (
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
              <button type="submit">Login</button>
              <button style={{backgroundColor: "blue", marginLeft: "25px"}} onClick={() => setGoogle(true)}>Login with Google</button>
            </form>
          </div>
          <br />
          <br />
          <div>
            <button onClick={() => setView("signup")}>Don't have an account? Sign Up!</button>
          </div>
        </div>
      )}
      {view === "signup" && (
        <div className="App">
          <h1>Sign Up Page</h1>
          <div className="login-form">
            <form onSubmit={SignUp}>
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
              <br />
              <br />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                autoComplete="current-password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <br />
              <button type="submit">Sign Up</button>
              <button style={{backgroundColor: "blue", marginLeft: "25px"}} onClick={() => setGoogle(true)}>Login with Google</button>
            </form>
          </div>
          <br />
          <br />
          <button onClick={() => setView("login")}>Already have an account? Login!</button>
        </div>
      )}
    </>
  );
}
