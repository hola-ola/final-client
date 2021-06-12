import React, { useEffect, useState } from "react";
import { Switch } from "react-router-dom";
import LoadingComponent from "./components/Loading";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/homepage/HomePage";
import LogIn from "./pages/auth/LogIn";
import ProtectedPage from "./pages/ProtectedPage";
import Signup from "./pages/auth/Signup";
import NormalRoute from "./routing-components/NormalRoute";
import LoggedOutRoute from "./routing-components/LoggedOutRoute";
import ProtectedRoute from "./routing-components/ProtectedRoute";
import { getLoggedIn, logout } from "./services/auth";
import * as PATHS from "./utils/paths";
import * as CONSTS from "./utils/consts";
import CreateListing from "./pages/listing/CreateListing";
import SingleListing from "./pages/listing/SingleListing";
import EditListing from "./pages/listing/EditListing";
import UserPage from "./pages/user/UserPage";

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    if (!accessToken) {
      return setIsLoading(false);
    }
    getLoggedIn(accessToken).then((res) => {
      if (!res.status) {
        return setIsLoading(false);
      }
      setUser(res.data.user);
      setIsLoading(false);
    });
  }, []);

  function handleLogout() {
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    if (!accessToken) {
      setUser(null);
      return setIsLoading(false);
    }
    setIsLoading(true);
    logout(accessToken).then((res) => {
      if (!res.status) {
        // deal with error here
        console.error("Logout was unsuccessful: ", res);
      }
      localStorage.removeItem(CONSTS.ACCESS_TOKEN);
      setIsLoading(false);
      return setUser(null);
    });
  }

  function authenticate(user) {
    setUser(user);
  }

  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <div className="App">
      <Navbar handleLogout={handleLogout} user={user} />
      <Switch>
        <NormalRoute exact path={PATHS.HOMEPAGE} component={HomePage} />
        <LoggedOutRoute
          exact
          user={user}
          path={PATHS.SIGNUPPAGE}
          authenticate={authenticate}
          component={Signup}
        />
        <LoggedOutRoute
          exact
          user={user}
          path={PATHS.LOGINPAGE}
          authenticate={authenticate}
          component={LogIn}
        />
        <ProtectedRoute
          exact
          path={PATHS.PROTECTEDPAGE}
          component={ProtectedPage}
          user={user}
        />
        <ProtectedRoute
          exact
          path={PATHS.CREATE_LISTING}
          component={CreateListing}
          user={user}
        />
        <ProtectedRoute
          exact
          path={PATHS.SINGLE_LISTING}
          component={SingleListing}
          user={user}
        />
        <ProtectedRoute
          exact
          path={PATHS.EDIT_LISTING}
          component={EditListing}
          user={user}
        />
        <ProtectedRoute
          exact
          path={PATHS.USERPAGE}
          component={UserPage}
          user={user}
          authenticate={authenticate}
        />
      </Switch>
    </div>
  );
}
