import css from './Header.module.css';
import { Button } from 'antd';
import React, { use, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
    const [user, setUser] = useState<string | null>(null);
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const location = useLocation();

    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            setIsLoggedIn(true);
            setUser("Hello " + JSON.parse(loggedInUser).name);
        } else {
            setUser('');
        }
    },  [location]);

    const handleLoginPageClick = () => {
        navigate('login');
    };

    const handleMainPageClick = () => {
        navigate('/');
    };

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        setUser('');
        setIsLoggedIn(false);
        navigate('/');
    };

    return(
        <header>
            <div className={css.headerLeft}>
                <Button color="cyan" size="large" variant="text" onClick={handleMainPageClick}>Main Page</Button>
                {/* <Button color="cyan" size="large" variant="text" onClick={handleLoginPageClick}>Login</Button> */}
            </div>
            <p className={css.headerMid}>{user}</p>
            <div className={css.headerRight}>
                {!isLoggedIn ? (
                    <Button color="cyan" size="large" variant="text" onClick={handleLoginPageClick}>Login</Button>
                ) : (
                    <Button color="cyan" size="large" variant="text" onClick={handleLogout}>Logout</Button>
                )}
            </div>
        </header>
    );
}