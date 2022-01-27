import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

export default function Router() {
  return (
    <BrowserRouter>
      <ul className="nav-ul">
        <li className="nav-li">
          <Link className="nav-link" to="/">Login</Link>
        </li>
        <li className="nav-li">
          <Link className="nav-link" to="/home">Home</Link>
        </li>
      </ul>

      <hr />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
