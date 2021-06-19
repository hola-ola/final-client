import React from "react";
import { Link } from "react-router-dom";
import * as PATHS from "../../utils/paths";
import "./DestinationCard.css";
import "../../style/Button.css";

export default function DestinationCard(props) {
  const { item } = props;
  return (
    <div className="dest-card">
      <div className="image-cropper">
        <Link
          to={`${PATHS.SEARCH_RESULTS}?q=${item.destination}`}
          className="btn"
        >
          <img
            src={item.src}
            alt={item.destination}
            className="dest-card-image"
          />
        </Link>
      </div>

      <h3>{item.destination}</h3>
      <Link
        to={`${PATHS.SEARCH_RESULTS}?q=${item.destination}`}
        className="btn darkkhaki"
      >
        See listings
      </Link>
    </div>
  );
}
