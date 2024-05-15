import React from 'react';
import { Route, redirect } from 'react-router-dom';
import { Sidebar } from '../Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';

// Import the route guard function
import { checkCredentials } from './Utils';

const Dashboard = ({ setIsLoggedIn }) => {
    return (
        <div style={{ display: 'flex', width: '100vw', position: 'relative', zIndex: 1 }}>
            <Sidebar setIsLoggedIn={setIsLoggedIn} />
            <div style={{ height: '90vh' }}></div>
        </div>
    );
};


const DashboardRoute = ({setIsLoggedIn}) => {
    const navigate = useNavigate();
    // Call the route guard function to check credentials
    const allowAccess = checkCredentials(navigate);

    return (
        allowAccess ? <Dashboard setIsLoggedIn={setIsLoggedIn} /> : navigate('/admin_login')
    );
};

export default DashboardRoute;
