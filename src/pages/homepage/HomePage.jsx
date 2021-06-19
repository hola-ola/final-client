import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as PATHS from "../../utils/paths";
import "./HomePage.css";
import "../../style/Button.css";

export default function HomePage(props) {
  const [query, setQuery] = useState("");

  function handleQueryChange(e) {
    const { target } = e;
    setQuery(target.value);
  }
  return (
    <div className="homepage-wrapper">
      <div className="search-container">
        <img
          src="https://res.cloudinary.com/dmvukjvqe/image/upload/v1624125007/hop-flat-swap/hero-image_ro9v7i.jpg"
          alt="Hero image"
          className="hero-image"
        />
        <div className="search-container-content">
          <h1>Find your perfect home exchange</h1>
          <div className="search-box">
            <h2>I'd like to swap for a place in...</h2>
            <div className="search-box-content">
              <input
                type="text"
                placeholder="enter city or country"
                className="search-box-input"
                onChange={handleQueryChange}
              />
              <Link
                to={`${PATHS.SEARCH_RESULTS}?q=${query}`}
                className="btn bigger sandybrown "
              >
                Let's swap!
              </Link>
            </div>
          </div>

          <div className="notsure-content">
            <h2>Not sure where to go?</h2>
            <Link
              to={`${PATHS.SEARCH_RESULTS}`}
              className="btn bigger sandybrown "
            >
              Explore all options
            </Link>
          </div>
        </div>
      </div>

      <div className="howitworks-container">
        <div className="howitworks-box">
          <h2>See how it works</h2>
          <p>1. Create your listing</p>
          <p>[description]</p>
          <p>[button]</p>
          <p>2. Look for homes</p>
          <p>[description]</p>
          <p>[button]</p>
          <p>3. Swap with someone</p>
          <p>[description]</p>
          <p>[button]</p>
          <p>4. Live like a local</p>
          <p>[description]</p>
          <p>[button]</p>
        </div>
      </div>

      <div className="destinations-container">
        <div className="destinations-box">
          <h2>Discover popular destinations</h2>
        </div>
      </div>
    </div>
  );
}
