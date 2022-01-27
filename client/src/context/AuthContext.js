import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

function AuthContextProvider(props) {

    const [loggedIn, setLoggedIn] = useState(undefined);
    const [userId, setUserId] = useState("");
    const [userEmail, setUserEmail] = useState("");

    async function getLoggedIn() {
        const loggedInRes = await axios.get("/api/user/loggedin");
        setLoggedIn(loggedInRes.data);
    }

    async function getUserId() {
        if (loggedIn) {
            const token = document.cookie;
            const payload = JSON.parse(window.atob(token.split('.')[1]))
            const id = payload.userId;
            setUserId(id);
        }
    };

    async function getUserEmail() {
        if (userId) {
            const userData = await axios.get(`/api/user/profile/${userId}`);
            setUserEmail(userData.data.email);
        }
    }

    useEffect(() => {
        getLoggedIn();
        getUserId();
        getUserEmail();
    });

    return <AuthContext.Provider value={{ loggedIn, getLoggedIn, userId, getUserId, userEmail, getUserEmail }}>{props.children}</AuthContext.Provider>
}

export default AuthContext;
export { AuthContextProvider };