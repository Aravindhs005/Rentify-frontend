import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.scss';
import loginImage from "./cozy.jpg"; 

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [passwordMatch, setPasswordMatch] = useState(true);

    useEffect(() => {
        setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === '');
    }, [formData.password, formData.confirmPassword]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://rentify-backend-git-main-aravindhs-projects-8b4b22dd.vercel.app/auth/register', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                navigate('/login');
            }
        } catch (err) {
            console.log('Registration failed', err.message);
        }
    };

    return (
        <div className="register">
            <div className="register_content">
                <div className="img-cont">
                  <img src={loginImage} alt="Register Image" className="register_image" />

                </div>
                <div className="form-cont">

                <form onSubmit={handleSubmit} className="register_content_form">
                    <input type="text" placeholder="Enter your First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
                    <input type="text" placeholder="Enter your Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    <input type="email" placeholder="Enter your Email" name="email" value={formData.email} onChange={handleChange} required />
                    <input type="password" placeholder="Enter your password" name="password" value={formData.password} onChange={handleChange} required />
                    {!passwordMatch && <p style={{ color: 'red' }}>Passwords do not match!</p>}
                    <input type="password" placeholder="Re-Enter your password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                    <button type="submit" disabled={!passwordMatch}>
                        REGISTER
                    </button>
                </form>
                <a href="/login" style={{textAlign:"center"}}>Already have an account? Log In Here</a>
                </div>

            </div>
        </div>
    );
};

export default RegisterPage;
