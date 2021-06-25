import React from "react";
import { Link } from "react-router-dom";

import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";
import { BiHomeHeart } from "react-icons/bi";

import "./Footer.css";
import "../../style/Button.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <div className="navbar-logo footer-part" id="footer-logo">
          <div>
            <BiHomeHeart className="navbar-logo-icon" size="30px" />
          </div>
          <div>
            <Link to={PATHS.HOMEPAGE} className="navbar-logo-name">
              <h4>{CONSTS.CAPITALIZED_APP}</h4>
            </Link>
          </div>
        </div>
        <div>
          <p id="under-logo">© Hop Flat Swap 2021</p>
        </div>
      </div>

      <div className="footer-part" id="footer-text">
        <Link to={PATHS.SEARCH_RESULTS}>
          <p>Explore the listings</p>
        </Link>
        <Link to={PATHS.SIGNUPPAGE}>
          <p>Join the community</p>
        </Link>
        <Link to={PATHS.LOGINPAGE}>
          <p>Login for new adventure</p>
        </Link>
      </div>

      <div className="footer-part">
        <p>Created by Aleksandra & Aleksandra</p>
        <a href="https://github.com/hola-ola" target="_blank">
          <button className="button darkcyan">View Github</button>
        </a>
        <a href="mailto:olaandolaIH@gmail.com">
          <button className="button darkcyan">Send us a message!</button>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
