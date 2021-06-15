import React from "react";
import { Link } from "react-router-dom";
import * as PATHS from "../../utils/paths";
import "./ResultCard.css";

function ResultCard(props) {
  const { item, index } = props;
  return (
    <div className="result-card">
      <div key={index}>
        <img src={item.imagesGallery[0]} alt={item.title} />
        <h4>{item.title}</h4>
        <p>
          {item.city}, {item.country}
        </p>
      </div>
      <Link to={`${PATHS.LISTINGS}/${item._id}`}>More info</Link>
    </div>
  );
}

export default ResultCard;
