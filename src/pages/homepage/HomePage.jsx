import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as PATHS from "../../utils/paths";
import * as CONTENT from "../../utils/content";
import DestinationCard from "../../components/DestinationCard/DestinationCard";
import HowToCard from "../../components/HowToCard/HowToCard";
import {
  BiHomeHeart,
  BiSearchAlt,
  BiMailSend,
  BiWinkSmile,
} from "react-icons/bi";
import { IoMdSwap } from "react-icons/io";
import "./HomePage.css";
import "../../style/Button.css";
import "../../style/Input.css";

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
                className="input-field search-box-input"
                onChange={handleQueryChange}
              />
              <Link to={`${PATHS.SEARCH_RESULTS}?q=${query}`}>
                <button className="button bigger sandybrown">
                  Let's swap!
                </button>
              </Link>
            </div>
          </div>

          <div className="notsure-content">
            <h2>Not sure where to go?</h2>
            <Link to={`${PATHS.SEARCH_RESULTS}`}>
              <button className="button bigger sandybrown">
                Explore all options
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="howitworks-container">
        <div className="content-box">
          <h2>See how it works?</h2>

          <div className="how-to-section">
            <div className="destinations-box">
              {CONTENT.HOW_IT_WORKS.map((item, index) => (
                <div className="how-to-box">
                  {index === 0 ? (
                    <BiHomeHeart size="50px" />
                  ) : index === 1 ? (
                    <BiSearchAlt size="50px" />
                  ) : index === 2 ? (
                    <BiMailSend size="50px" />
                  ) : index === 3 ? (
                    <IoMdSwap size="50px" />
                  ) : (
                    <BiWinkSmile size="50px" />
                  )}
                  <HowToCard item={item} key={index} />
                </div>
              ))}
            </div>
            <div className="btn-container-center">
              <Link to={`${PATHS.CREATE_LISTING}`}>
                <button className="button bigger coral">
                  Create your listing
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="destinations-container">
        <div className="content-box">
          <h2>Discover popular destinations</h2>
          <div className="destinations-box">
            {CONTENT.POPULAR_DESTINATIONS.map((item, index) => (
              <DestinationCard item={item} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
