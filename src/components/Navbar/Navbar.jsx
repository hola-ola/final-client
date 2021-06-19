import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";

const Navbar = (props) => {
  const { user } = props;

  return (
    <nav>
      <div>
        <Link to={PATHS.HOMEPAGE} className="project-name">
          {CONSTS.CAPITALIZED_APP}
        </Link>
      </div>

      <div>
        {user ? (
          <>
            <div className="navbar">
              <Link to={`${PATHS.USER}/${user.username}`} className="authLink">
                Profile
              </Link>
              <Link to={PATHS.HOMEPAGE} className="authLink">
                Inbox
              </Link>
              <p>Hey, {props.user.username}!</p>
              <button className="nav-logoutbtn" onClick={props.handleLogout}>
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <div>
              <Link to={PATHS.SIGNUPPAGE} className="authLink">
                Signup
              </Link>
              <Link to={PATHS.LOGINPAGE} className="authLink">
                Log In
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
