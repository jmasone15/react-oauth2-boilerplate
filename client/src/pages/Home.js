import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

export default function Home() {

    const { userEmail } = useContext(AuthContext);

    return (
        <div className="App">
            <h1>Home Page</h1>
            <h3>Welcome {userEmail}!</h3>
        </div>
    );
}
