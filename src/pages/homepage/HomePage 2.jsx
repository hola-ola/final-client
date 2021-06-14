import React from "react";
import "./HomePage.css";

export default function HomePage(props) {
  return (
    <div>
      <div className="home-container">
        <div className="search">
          <input type="text" placeholder="I live in..."></input>
          <input type="text" placeholder="I'd like to swap for..."></input>
          <button type="submit">Let's swap!</button>
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
