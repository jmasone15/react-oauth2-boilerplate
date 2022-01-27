import React, { useContext } from "react";
import AuthContext from "./context/AuthContext";
import { BrowserRouter, Routes, Route, Redirect } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Login from "./pages/Login";

export default function Router() {

  const { loggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        {!loggedIn && (
          <>
            <Route exact path="/" element={<Login />} />
            <Route path="/home" element={<Login />} />
          </>
        )}
        {loggedIn && (
          <>
            <Route exact path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
