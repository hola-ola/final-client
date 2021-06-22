import React from "react";
import { Link } from "react-router-dom";
import * as PATHS from "../../utils/paths";
import "./ResultCard.css";
import "../../style/Button.css";

function ResultCard(props) {
  const { item, index, RemoveListing, owner } = props;
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
      <Link to={`${PATHS.LISTINGS}/${item._id}`}>
        <button className="button darkcyan">{props.children}</button>
      </Link>
      {owner ? (
        <>
          <button
            className="button red"
            onClick={() => RemoveListing(item._id)}
          >
            Remove from wishlist
          </button>
        </>
      ) : null}
    </div>
  );
}

export default ResultCard;
