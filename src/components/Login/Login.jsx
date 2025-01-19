import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSignUp) {
      // Sign Up
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      try {
        const response = await axios.post('http://localhost/blog-ids/signup.php', {
          username: username,
          email: email,
          password: password
        });
        console.log(response)
        alert(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred during sign up.");
      }
    } else {
      // Sign In
      try {
        const response = await axios.post('http://localhost/blog-ids/login.php', {
          email,
          password
        });
        alert(response.data.message);
        localStorage.setItem("token", response.data.token); // Store token in localStorage
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred during sign in.");
      }
    }
  };

  return (
    <div>
      {!isSignUp ? (
        <form className="form" onSubmit={handleSubmit}>
          <div className="flex-column">
            <label>Email </label>
          </div>
          <div className="inputForm">
            <input
              placeholder="Enter your Email"
              className="input"
              type="text"
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          <div className="flex-column">
            <label>Password </label>
          </div>
          <div className="inputForm">
            <input
              placeholder="Enter your Password"
              className="input"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="flex-row">
            <div>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
              <label>Remember me </label>
            </div>
            <span className="span">Forgot password?</span>
          </div>
          <button className="button-submit" type="submit">
            Sign In
          </button>
          {error && <p className="error">{error}</p>}
          <p className="p">
            Don't have an account?{' '}
            <span className="span" onClick={handleSignUpClick}>
              Sign Up
            </span>
          </p>
        </form>
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          <div className="flex-column">
            <label>Username </label>
          </div>
          <div className="inputForm">
            <input
              placeholder="Enter your Username"
              className="input"
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>

          <div className="flex-column">
            <label>Email </label>
          </div>
          <div className="inputForm">
            <input
              placeholder="Enter your Email"
              className="input"
              type="text"
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          <div className="flex-column">
            <label>Password </label>
          </div>
          <div className="inputForm">
            <input
              placeholder="Enter your Password"
              className="input"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="flex-column">
            <label>Confirm Password </label>
          </div>
          <div className="inputForm">
            <input
              placeholder="Confirm your Password"
              className="input"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>

          <button className="button-submit" type="submit">
            Sign Up
          </button>
          {error && <p className="error">{error}</p>}
          <p className="p">
            Already have an account?{' '}
            <span className="span" onClick={handleSignInClick}>
              Sign In
            </span>
          </p>
        </form>
      )}
    </div>
  );
};

export default Login;
