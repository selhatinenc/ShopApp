import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/logoson1.png'; // Logomuz

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');

  const validateInputs = () => {
    if (!email || !password || !name || !phoneNumber || (!username && role === 'moderator') || (!username && role === 'customer')) {
      return 'All fields are required.';
    }
    if (username && !/^[a-zA-Z0-9]+$/.test(username)) {
      return 'Username must contain only letters and numbers.';
    }
    if (password.length < 6 || password.length > 25) {
      return 'Password length must be between 6 and 25 characters.';
    }
    if (phoneNumber.length !== 11) {
      return 'Phone number must be 11 digits long.';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return 'Please enter a valid email address.';
    }
    return '';
  };

  const handleRegister = () => {
    const errorMessage = validateInputs();
    if (errorMessage) {
      setError(errorMessage);
      setSuccess('');
      return;
    }
    setError('');

    let registerUrl = '';
    switch (role) {
      case 'moderator':
        registerUrl = 'http://localhost:8080/moderator';
        break;
      case 'customer':
        registerUrl = 'http://localhost:8080/customer';
        break;
      case 'merchant':
        registerUrl = 'http://localhost:8080/merchant';
        break;
      default:
        setError('Invalid user role.');
        setSuccess('');
        return;
    }

    fetch(registerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
        phoneNumber: phoneNumber,
        username: username,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 409) {
            throw new Error('A user with this information already exists.');
          } else {
            throw new Error('Registration failed.');
          }
        }
        setSuccess('Registration successful!');
        setError('');
        if (role === 'merchant') {
          fetch(`http://localhost:8080/merchant/getName/${name}`, {
            method: 'GET'
          })
            .then(response => response.json())
            .then(data => {
              localStorage.setItem('data', JSON.stringify(data));
              localStorage.setItem('usertype', "merchant");
              navigate('/merchantdashboard');
            })
            .catch(error => console.error('Fetching Customer Data Error:', error));
           
        
         
        } else if (role === 'moderator') {
            fetch(`http://localhost:8080/moderator/getName/${name}`, {
              method: 'GET'
            })
              .then(response => response.json())
              .then(data => {
                localStorage.setItem('data', JSON.stringify(data));
                localStorage.setItem('usertype', "moderator");
                navigate('/moderatordashboard');
              })
              .catch(error => console.error('Fetching Customer Data Error:', error));
             

          
        } else {
          fetch(`http://localhost:8080/customer/getMail?mail=${email}`, {
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
        
        }
      })
      .catch((error) => {
        setError(error.message);
        setSuccess('');
      });
  };

  const renderAdditionalInputs = () => {
    if (role === 'moderator' || role === 'customer') {
      return (
        <input
          className="w-full px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      );
    }
    return null;
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <img src={Logo} alt="Logo" className="logo" />

      <div className="bg-gray-200 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-black text-center">Sign Up</h2>
        {error && !success && <div className="bg-red-200 text-red-800 p-2 mb-4">{error}</div>}
        {success && <div className="bg-green-200 text-green-800 p-2 mb-4">Registration successful!</div>}

        <select
          className="w-full px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          value={role}
          onChange={(e) => setRole(e.target.value)}>
          <option value="">Select a role</option>
          <option value="customer">Customer</option>
          <option value="merchant">Merchant</option>
          <option value="moderator">Moderator</option>
        </select>
        {renderAdditionalInputs()}
        <input
          className="w-full px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        

        <input
          className="w-full px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          onKeyPress={(e) => {
            // Yalnızca sayı girişine izin vermek için kontrol yapalım
            const keyCode = e.keyCode || e.which;
            const keyValue = String.fromCharCode(keyCode);
            if (!/[0-9]/.test(keyValue)) {
              e.preventDefault();
            }
          }}
        />
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mb-2"
          onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
}

export default SignUp;
