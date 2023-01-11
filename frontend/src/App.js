import React, { useReducer, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, useHistory, Redirect } from "react-router-dom";
import { AppContext } from "./context/appContext";
import { AuthContext } from "./context/authContext";
import { auth } from "./firebase";
import { initialState, appReducer } from "./reducer/appReducer";
import {
  initialState as authInitialState,
  authReducer,
} from "./reducer/authReducer";
import { SET_ISLOADING, SET_USER } from "./const/index";
import Header from "./components/Header/Header";
import AppList from "./components/AppList/AppList";
import AppDetail from "./components/AppDetail/AppDetail";
import Login from "./components/Login/Login";
import Footer from "./components/Footer/Footer";

import "./App.css";
import Register from "./components/register/Register";
import AdminDashboard from "./components/admindashboard/admin";

const App = () => {
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);
  const [app, dispatch] = useReducer(appReducer, initialState);
  const [user, setUser] = useState({})
  const history = useHistory()
  useEffect(() => {
    if (localStorage.getItem('user')) {
      setUser(JSON.parse(localStorage.getItem('user')))
    }

  }, []);
  const redirectPath = () => {
    if (localStorage.getItem('role')) {
      if (localStorage.getItem('role') == 'admin') {
        return <Redirect to="/adminDashboard" />
      } else if (localStorage.getItem('role') == 'user') {
        return <Redirect to="/" />
      } else {
        return <Redirect to="/" />
      }
    }
  }
  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      <AppContext.Provider value={{ app, dispatch }}>
        <Router>
          <div className="app">
            <Header user={user} />
            <Switch>
              {/* {redirectPath()} */}
              <Route path="/detail/:id">
                <AppDetail />
                <Footer />
              </Route>
              <Route exact path="/login">
                <Login />
                <Footer />
              </Route>
              <Route path="/adminDashboard">
                <AdminDashboard />
                <Footer />
              </Route>
              <Route path="/register">
                <Register />
                <Footer />
              </Route>
              <Route user={user} path="/">
                <AppList />
                <Footer />
              </Route>
            </Switch>
          </div>
        </Router>
      </AppContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
