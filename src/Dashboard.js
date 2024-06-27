import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();
    const [loggedInUserName, setLoggedInUserName] = useState('');
    const [quizResults, setQuizResults] = useState([]);

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        navigate('/');
    };

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || {};
        setLoggedInUserName(loggedInUser.name);

        const storedQuizResults = JSON.parse(localStorage.getItem('quizResults')) || [];
        setQuizResults(storedQuizResults);
    }, []);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div className="navbar-nav">
                        <Link className="nav-link" to="/home">
                            Home
                        </Link>
                        <Link className="nav-link" to="/dashboard">
                            Dashboard
                        </Link>
                    </div>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <div className="nav-link">
                                <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" width={'40px'} height={'40px'} alt="User Profile" />
                                {loggedInUserName}
                            </div>
                            <Link className="nav-link" to="/">
                                <Button variant="outline-primary" onClick={handleLogout}>Logout</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            <div className='container'>
                <h2>Dashboard</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Score</th>
                            <th scope="col">Date</th>
                            <th scope="col">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quizResults.map((result, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{loggedInUserName}</td>
                                <td>{result.score}</td>
                                <td>{result.date}</td>
                                <td>{result.timeTaken} seconds</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Dashboard;
