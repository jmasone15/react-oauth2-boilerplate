import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Nav() {

    const navigate = useNavigate();
    const { loggedIn, getLoggedIn } = useContext(AuthContext);

    async function handleLogout(e) {
        e.preventDefault();
        await axios.get("/api/user/logout");
        await getLoggedIn();
        navigate("/");
    }

    return (
        <>
            <ul className="nav-ul">
                {loggedIn && (
                    <li className="nav-li">
                        <a className="nav-link" onClick={(e) => handleLogout(e)}>Logout</a>
                    </li>
                )}
                <li className="nav-li">
                    <Link className="nav-link" to="/">Login</Link>
                </li>
                <li className="nav-li">
                    <Link className="nav-link" to="/home">Home</Link>
                </li>
            </ul>

            <hr />
        </>
    );
}
