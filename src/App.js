import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('sl');
  const [userData, setUserData] = useState(true);
  const [data, setData] = useState(true);
  

  useEffect(() => {
    fetch('http://localhost:5000/')  // Use the URL of your Python API
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  const SL = () => {
    return (
    <div className='container'>
      <header>Sign up, or log in if you already have an account</header>
      <p className='firstacc'>First account?</p>
      <button className="button" onClick={() => setCurrentPage('signup')}>Go to Sign Up</button>
      <p className='logacc'>Already have an account?</p>
      <button className="button" onClick={() => setCurrentPage('login')}>Go to Login</button>
      
    </div>
        
    );
  };


  // SignUp Component
  const SignUp = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const phoneRef = useRef();

    const handleSubmit = (e) => {
      e.preventDefault();
      window.Pelcro.user.register({
        email: emailRef.current.value,
        password: passwordRef.current.value,
        first_name: firstNameRef.current.value,
        last_name: lastNameRef.current.value,
        phone: phoneRef.current.value
      }, (error, response) => {
        if (error) {
          return console.log("error", error.message);
        }
        const user = response.data;
        console.log(user);
        setCurrentPage('success');
      });
    };

    return (
      <div className="container">
        <header>Sign Up</header>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-box">
            <label htmlFor="firstName">First Name</label>
            <input id="firstName" ref={firstNameRef} type="text" placeholder="Enter first name" required />
          </div>

          <div className="input-box">
            <label htmlFor="lastName">Last Name</label>
            <input id="lastName" ref={lastNameRef} type="text" placeholder="Enter last name" required />
          </div>

          <div className="input-box">
            <label htmlFor="phone">Phone Number</label>
            <input id="phone" ref={phoneRef} type="tel" placeholder="Enter phone number" required />
          </div>

          <div className="input-box">
            <label htmlFor="email">Email Address</label>
            <input id="email" ref={emailRef} type="email" placeholder="Enter email address" required />
          </div>

          <div className="input-box">
            <label htmlFor="password">Password</label>
            <input id="password" ref={passwordRef} type="password" placeholder="Enter password" required />
          </div>

          <button>Submit</button>
        </form>
      </div>
    );
  };

  // Success Component
  const Success = () => {
    return (
      <div className="container">
        <header>Registration Successful!</header>
        <div className="success-content">
          <h4 className='accSuccess'>Your account has been created successfully</h4>
          <p className='accProceed'>Please proceed to login with your credentials.</p>
          <button className="button" onClick={() => setCurrentPage('login')}>Go to Login</button>
        </div>
      </div>
    );
  };

  // Login Component
  const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = (e) => {
      e.preventDefault();
      window.Pelcro.user.login({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }, (error, response) => {
        if (error) {
          return console.log("error", error.message);
        }
        setUserData(response.data);
        setCurrentPage('home');
      });
    };

    return (
      <div className="container">
        <header>Login</header>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-box">
            <label htmlFor="email">Email Address</label>
            <input id="email" ref={emailRef} type="email" placeholder="Enter email address" required />
          </div>

          <div className="input-box">
            <label htmlFor="password">Password</label>
            <input id="password" ref={passwordRef} type="password" placeholder="Enter password" required />
          </div>

          <button>Login</button>
        </form>
      </div>
    );
  };

  // Home Component
  const Home = () => {
    const handleLogout = () => {
      window.Pelcro.user.logout((error) => {
        if (error) {
          console.log("error", error.message);
          return;
        }
        setUserData(null);
        setCurrentPage('sl');
      });
    };

    return (
      <div className="container">
        <header>Welcome, {userData.first_name}!</header>
        <div className="user-info">
          <h4 className='accSuccess'>Your Profile Information</h4>
          <div className="info-box">
            <p className='home'>First Name:</p>
            <p>{userData.first_name}</p>
            <p className='home'>Last Name:</p>
            <p>{userData.last_name}</p>
            <p className='home'>Email:</p>
            <p>{userData.email}</p>
            <p className='home'>Phone:</p>
            <p>{userData.phone}</p>
          </div>
          <button className='button' onClick={handleLogout}>Logout</button>
        </div>
      </div>
    );
  };

  // Render the current page
  const renderPage = () => {
    switch (currentPage) {
      case 'sl':
        return <SL />;
      case 'signup':
        return <SignUp />;
      case 'success':
        return <Success />;
      case 'login':
        return <Login />;
      case 'home':
        return <Home />;
      default:
        return <SL />;
    }
  };

  return renderPage();
}

export default App;
