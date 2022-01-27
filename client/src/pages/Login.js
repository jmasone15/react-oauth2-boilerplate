import React, { useState } from 'react';

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState("login");


  return (
    <div className="App">
        <h1>Login Page</h1>
        <div className="login-form">
          <form onSubmit={""}>
            <input 
              type="text"
              id="email"
              name="email"
              placeholder="Email Address"
              autoComplete="email"
              autoFocus
            />
            <input 
              type="password"
            />
            <button type="submit">Login</button>
          </form>
        </div>
    </div>
  );
}
