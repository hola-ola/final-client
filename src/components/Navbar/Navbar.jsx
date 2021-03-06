import React from "react";
import { Link } from "react-router-dom";

import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";
import { BiHomeHeart } from "react-icons/bi";

import "./Navbar.css";
import "../../style/Button.css";

const Navbar = (props) => {
  const { user, handleLogout } = props;

  return (
    <nav>
      <div className="navbar-logo">
        <div>
          <BiHomeHeart className="navbar-logo-icon" size="30px" />
        </div>
        <div>
          <Link to={PATHS.HOMEPAGE} className="navbar-logo-name">
            {CONSTS.CAPITALIZED_APP}
          </Link>
        </div>
      </div>

      <div>
        {user ? (
          <>
            <div className="navbar-links">
              {/* <div>Hey, {user.username}!</div> */}
              <Link
                to={`${PATHS.USER}/${user.username}`}
                className="navbar-link"
              >
                Profile
              </Link>
              <Link to={PATHS.HOMEPAGE} className="navbar-link">
                Inbox
              </Link>
              <Link className="navbar-link" onClick={handleLogout}>
                <button className="button sandybrown">Logout</button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="navbar-links">
              <Link
                to={PATHS.SIGNUPPAGE}
                className="btn sandybrown navbar-link"
              >
                Sign up
              </Link>
              <Link to={PATHS.LOGINPAGE} className="btn sandybrown navbar-link">
                Log in
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
