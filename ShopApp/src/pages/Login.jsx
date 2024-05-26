import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/logoson1.png'; // Logomuz


function Login() {
  const navigate = useNavigate();
  const [emailOrName, setEmailOrName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [selectedRole, setSelectedRole] = useState('customer'); 

  const handleLogin = () => {
    if (!emailOrName || !password) {
      setError('Name/Email and password are required.');
      return;
    }
    if (password.length < 6 || password.length > 25) {
      setError('Password length must be between 6 and 25 characters.');
      return;
    }
  
    if (selectedRole === 'customer') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailOrName)) {
        setError('Please enter a valid email address.');
        return;
      }
    }
  
    setError(''); // Clear the error message

    const requestUrl = selectedRole === 'moderator' ? `http://localhost:8080/moderator/getName/${emailOrName}` 
                    : selectedRole === 'merchant' ? `http://localhost:8080/merchant/getName/${emailOrName}`
                    : 'http://localhost:8080/auth/login';

    const requestOptions = {
      method: selectedRole === 'customer'  || selectedRole === 'admin' ? 'POST' : 'GET',
      headers: selectedRole === 'customer' || selectedRole === 'admin'? { 'Content-Type': 'application/json' } : undefined,
      body: selectedRole === 'customer' || selectedRole === 'admin'? JSON.stringify({ email: emailOrName, password }) : undefined
    };

    fetch(requestUrl, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (selectedRole === 'customer' || selectedRole === 'admin') {
          if (data.accessToken) {
            fetch(`http://localhost:8080/customer/getMail?mail=${emailOrName}`, {
              method: 'GET'
            })
              .then(response => response.json())
              .then(customerData => {
                localStorage.setItem('data', JSON.stringify(customerData));
                console.log(customerData)
                 if (customerData && customerData.role === 'ROLE_ADMIN') {
              navigate('/admindashboard');
              localStorage.setItem('usertype', "admin");
                
            } else {
              navigate('/');
              localStorage.setItem('usertype', "customer");
            }
              })
              .catch(error => console.error('Fetching Customer Data Error:', error));
          
               
          } else {
            setError('Invalid credentials. Please try again.');
          }
        } else {
          localStorage.setItem('data', JSON.stringify(data));
          localStorage.setItem('usertype', selectedRole);
          if(selectedRole== 'customer'){
            navigate('/userdashboard')
          }
          navigate(`/${selectedRole}dashboard`);
          
        }
      })
      .catch(error => console.error('Login Error:', error));
  };

  const handleForgotPassword = () => {
    navigate('/forget');
    // Direct to forgot page
  };

  const handleRegister = () => {
    navigate('/register');
    // Direct to register page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-300">
      <img src={Logo} alt="Logo" className="logo" />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-700">ShopSmart</h1>
      </div>
      <div className="bg-gray-200 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <div className="bg-red-100 text-red-600 p-2 mb-4">{error}</div>}
        <input
          className="w-full px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          type="text"
          placeholder={selectedRole === 'customer' ? "Email" : "Name"}
          value={emailOrName}
          onChange={(e) => setEmailOrName(e.target.value)}
        />
        <input
          className="w-full px-4 py-2 mb-4 rounded-md border border-gray-300"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select
          className="w-full px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="customer">Customer</option>
          <option value="merchant">Merchant</option>
          <option value="admin">Admin</option>
          <option value="moderator">Moderator</option>
        </select>
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mb-2" onClick={handleLogin}>
          Login
        </button>
        <button className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md mb-2" onClick={handleRegister}>
          Register
        </button>
        <button className="w-full text-blue-500 hover:underline mb-2" onClick={handleForgotPassword}>
          Forgot password?
        </button>
      </div>
    </div>
  );
}

export default Login;
