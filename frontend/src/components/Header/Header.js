import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import { useAppState } from "../../context/appContext";
import { useAuthState } from "../../context/authContext";
import { baseService } from "../../services/index";
import { SET_SEARCH } from "../../const/index";

import "./Header.css";

const debounce = (func, wait, immediate) => {
  let timeout;
  return function () {
    let context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

const Header = () => {
  let user = {}
  if (localStorage.getItem('user')) {
    user = JSON.parse(localStorage.getItem('user'))
  }
  const history = useHistory();


  const searchChange = debounce((e) => {

  }, 500);

  const handleLogin = () => {
    history.push("/login");
  };

  const handleLogout = () => {
    // auth.signOut();
    localStorage.removeItem('user')
    localStorage.removeItem('role')
    history.push('/login')
    window.location.reload()
  };

  return (
    <div className="header">
      <Link to="/">
        <div className="appName">AppStore</div>
      </Link>
      <div className="searchContainer">
        <input
          type="text"
          list="searchList"
          placeholder="Search for an application here..."
          onChange={searchChange}
        />
        <div className="searchList">
          {/* <datalist id="searchList">
            {searchList.map((search) => (
              <option value={search.name} key={search._id} />
            ))}
          </datalist> */}
        </div>
      </div>
      {user ? (
        <div className="loginButton" onClick={handleLogout}>
          Logout {user.email}
        </div>
      ) : (
        <div className="loginButton" onClick={handleLogin}>
          Login
        </div>
      )}
    </div>
  );
};

export default Header;
