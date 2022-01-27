import React from 'react';
import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <>
            <ul className="nav-ul">
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
