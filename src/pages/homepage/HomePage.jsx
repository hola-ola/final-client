import React from "react";
import { Link } from "react-router-dom";
import * as PATHS from "../../utils/paths";
import "./HomePage.css";

export default function HomePage(props) {
  return (
    <div>
      <div className="home-container">
        <div className="search">
          <h1>Find your perfect home exchange</h1>
          <h3>I'd like to swap for a place in...</h3>
          <input type="text" placeholder="enter city or country"></input>
          <Link to={`${PATHS.SEARCH_RESULTS}`} className="search-button">
            Let's swap!
          </Link>
          <p>or</p>
          <Link to={`${PATHS.SEARCH_RESULTS}`} className="search-button">
            Explore all options
          </Link>
        </div>
      </div>

      <div className="home-container white-back">
        <h1>Swap flats and live wherever you want</h1>
      </div>

      <div className="home-container quote-section">
        <h1>Here will be a cool quote</h1>
      </div>

      <div className="home-container white-back">
        <h1>Popular swap spots</h1>
      </div>
    </div>
  );
}
