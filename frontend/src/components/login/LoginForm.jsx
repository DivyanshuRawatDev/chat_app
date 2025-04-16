import React, { useState } from 'react';
import styles from '../../styles/login/loginform.module.css';
import { useDispatch } from 'react-redux';
import { fetchFirebaseSignup, fetchLoginUser } from '../../redux/slices/authSlice';
import { signInWithGoogle } from '../../utils/firebase';

const LoginForm = () => {
  const [userData, setUserData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    let { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    dispatch(fetchLoginUser(userData));
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((idToken) => {
        dispatch(fetchFirebaseSignup(idToken))
      })
      .catch((err) => console.log(err));
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
      <div className={styles.login_container}>
        <div className={styles.forms_div}>
          <h2 className={styles.login_heading}>LOG IN</h2>
          <div className={styles.forms}>
            <input placeholder="Email" name="email" onChange={(e) => handleChange(e)} />
            <input placeholder="Password" name="password" onChange={(e) => handleChange(e)} />
            <button onClick={handleLogin}>LOG IN</button>
            <p className={styles.forget_password}>Forget Password?</p>
          </div>
        </div>
        <div className={styles.hr_div}>
          <hr />
          <span>OR</span>
          <hr />
        </div>
        <div className={styles.links_div}>
          <div className={styles.external_links}>
            <img src="/src/assets/auth/google.svg" alt="Google Logo" onClick={handleGoogleLogin} />
            <img src="/src/assets/auth/facebook.svg" alt="Google Logo" />
            <img src="/src/assets/auth/linkedin.svg" alt="Google Logo" />
          </div>
          <p className={styles.auth_toggler}>
            Need an account? <span style={{ color: 'blue', cursor: 'pointer' }}>SIGN UP</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
