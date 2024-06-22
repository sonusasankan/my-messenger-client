// Logout.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthDispatchContext } from '../../store'; // Adjust the import path according to your project structure

const Logout = () => {
    const navigate = useNavigate();
    const authDispatch = useContext(AuthDispatchContext);

    const handleOnClick = () => {
        // Clear authentication data from local storage
        localStorage.removeItem('token');

        // Dispatch logout action to update application state
        authDispatch({ type: 'LOGOUT' });

        // Redirect to the login page
        navigate('/login');
    };

    return (
        <button onClick={handleOnClick}>Logout</button>
    );
};

export default Logout;
