import React from "react";
import { Link } from "react-router-dom";
import * as PATHS from "../../utils/paths";
import "./ResultCard.css";

function ResultCard(props) {
  const { item, index } = props;
  return (
    <div className="result-card">
      <div key={index}>
        <Link to={`${PATHS.LISTINGS}/${item._id}`}>
          <img src={item.imagesGallery[0]} alt={item.title} />
        </Link>

        <Link to={`${PATHS.LISTINGS}/${item._id}`}>
          <h4>{item.title}</h4>
        </Link>

        <p>
          {item.city}, {item.country}
        </p>
      </div>
      <Link to={`${PATHS.LISTINGS}/${item._id}`}>{props.children}</Link>
    </div>
  );
}

export default ResultCard;
