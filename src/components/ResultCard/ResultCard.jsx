import React from "react";
import { Link } from "react-router-dom";
import * as PATHS from "../../utils/paths";
import "./ResultCard.css";
import "../../style/Button.css";

function ResultCard(props) {
  const { item, index } = props;
  return (
    <div className="result-card">
      <div key={index}>
        <div className="result-card-image center">
          <Link to={`${PATHS.LISTINGS}/${item._id}`}>
            <img src={item.imagesGallery[0]} alt={item.title} />
          </Link>
        </div>
        <div className="result-card-content center">
          <Link to={`${PATHS.LISTINGS}/${item._id}`}>
            <h4>{item.title}</h4>
          </Link>
        </div>
        <div className="result-card-content center">
          <p>
            {item.city}, {item.country}
          </p>
        </div>
      </div>
      <div className="result-card-content center">
        <Link to={`${PATHS.LISTINGS}/${item._id}`}>
          <button className="button darkcyan">{props.children}</button>
        </Link>
      </div>
    </div>
  );
}

export default ResultCard;
