import Axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";

import "./Login.css";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:3002/user/login', { email, password }).then(async ({ data }) => {
      const config = {
        headers: {
          Authorization: data.token
        }
      }
      await Axios.get('http://localhost:3002/user/currentUser', config).then(async ({ data }) => {
        localStorage.setItem('user', JSON.stringify(data.user));
        await Axios.get(`http://localhost:3002/role/${data.user.role}`).then(({ data }) => {
          localStorage.setItem('role', data);
          if (data == 'admin') {
            window.location.reload()
            history.push('/adminDashboard')
          } else if (data == 'user') {
            window.location.reload()
            history.push('/')
          } else {
            window.location.reload()
            history.push('/')
          }
        }).catch(err => console.error(err))
      }).catch(err => console.error(err))
    }).catch(err => console.error(err))

  };

  const handleRegister = (e) => {
    e.preventDefault();

  };

  return (
    <div className="login">
      <form className="loginForm">
        <input
          type="email"
          value={email}
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="loginButton"
          type="submit"
          onClick={(e) => handleLogin(e)}
        >
          Login
        </button>
        <button
          className="registerButton"
          type="submit"
          onClick={(e) => history.push('/register')}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Login;
