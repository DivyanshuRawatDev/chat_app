import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from '../../styles/singup/signupform.module.css';
import { fetchSignupUser } from '../../redux/slices/authSlice';

const SignupForm = () => {
  const [userData, setUserData] = useState({ name: '', email: '', password: '' });
  const dispatch = useDispatch();

  let handleChange = (e) => {
    let { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = () => {
    dispatch(fetchSignupUser(userData));
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#6D9AC4',
      }}
    >
      <div className={styles.singup_container}>
        <div className={styles.forms_div}>
          <h2 className={styles.signup_heading}>SIGN UP</h2>
          <div className={styles.forms}>
            <input placeholder="Name" onChange={(e) => handleChange(e)} name="name" />
            <input placeholder="Email" onChange={(e) => handleChange(e)} name="email" />
            <input placeholder="Password" onChange={(e) => handleChange(e)} name="password" />
            <button onClick={handleSignup}>SIGN UP</button>
          </div>
        </div>
        <div className={styles.hr_div}>
          <hr />
          <span>OR</span>
          <hr />
        </div>
        <div className={styles.links_div}>
          <div className={styles.external_links}>
            <img src="/src/assets/auth/google.svg" alt="Google Logo" />
            <img src="/src/assets/auth/facebook.svg" alt="Google Logo" />
            <img src="/src/assets/auth/linkedin.svg" alt="Google Logo" />
          </div>
          <p className={styles.auth_toggler}>
            Already a user? <span style={{ color: 'blue', cursor: 'pointer' }}>Login</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
