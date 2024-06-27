import React from 'react';
import { Link } from 'react-browser-router';

function Header() {
    return (
        <div>
            <nav className="navbar navbar-light bg-light">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="navbar-brand p-4">Quiz App</span>
                </Link>
                <div className="ml-auto">
                    <div className="dropdown mx-5">
                        <Link to="/">
                            <img src="path/to/profileIcon.png" alt="Profile Icon" className="img" />
                        </Link>
                        <span>Username</span>
                        <img
                            src="path/to/menuIcon.png"
                            alt="Menu Icon"
                            className="img"
                            style={{ cursor: "pointer" }}
                        />
                        <div className="dropdown-menu dropdown-menu-right show">
                            <button className="dropdown-item">Dashboard</button>
                            <button className="dropdown-item select">Logout</button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
