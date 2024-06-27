import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Register() {
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        mobileNumber: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        const { name, email, password, mobileNumber } = formData;

        if (!name.trim()) {
            newErrors.name = 'Please enter your name.';
        }
        if (!email.trim()) {
            newErrors.email = 'Please enter your email.';
        }
        if (!password.trim()) {
            newErrors.password = 'Please enter your password.';
        }
        if (!mobileNumber.trim()) {
            newErrors.mobileNumber = 'Please enter your mobile number.';
        }

        if (Object.keys(newErrors).length === 0) {
            let users = JSON.parse(localStorage.getItem('Users')) || [];
            users.push(formData);
            localStorage.setItem('Users', JSON.stringify(users));
            localStorage.setItem('loggedInUser', JSON.stringify(formData)); // Save logged-in user details
            setFormData({
                name: '',
                email: '',
                password: '',
                mobileNumber: ''
            });
            setErrors({});
        } else {
            setErrors(newErrors);
        }
    };



    return (
        <div>
            <div className='navbar'>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/">Login</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            <div className='formContainer'>
                <div className='formWrapper'>
                    <span className='title'>Registration Page</span>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input type="text"
                                className="form-control"
                                placeholder='Name'
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange} />
                            {errors.name && <div className="text-danger">{errors.name}</div>}
                        </div>
                        <div className="mb-3">
                            <input type="email"
                                className="form-control"
                                placeholder='Email'
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange} />
                            {errors.email && <div className="text-danger">{errors.email}</div>}
                        </div>
                        <div className="mb-3">
                            <input type="password"
                                className="form-control"
                                placeholder='Password'
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange} />
                            {errors.password && <div className="text-danger">{errors.password}</div>}
                        </div>
                        <div className="mb-3">
                            <input type="text"
                                className="form-control"
                                placeholder='Mobile Number'
                                name="mobileNumber"
                                value={formData.mobileNumber}
                                onChange={handleInputChange} />
                            {errors.mobileNumber && <div className="text-danger">{errors.mobileNumber}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
