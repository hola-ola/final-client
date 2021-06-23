import React, { useState, useEffect } from "react";
import * as LISTING_SERVICE from "../../services/listing.service";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";

import "./DeleteListing.css";

export default function DeleteListing(props) {
  const [listing, setListing] = useState({});
  const [error, setError] = useState(null);
  const listingFromProps = props.match.params.listingId;
  const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

  useEffect(() => {
    LISTING_SERVICE.DELETE_LISTING(listingFromProps, accessToken)
      .then((res) => {
        if (!res) {
          return props.history.push(PATHS.HOMEPAGE);
        }
        if (!res.data.listing) {
          return props.history.push(PATHS.HOMEPAGE);
        }
        setListing(res.data.listing);
      })
      .catch((err) => console.log("This is the error:", err));
  }, [listingFromProps]);

  console.log(listing);

  return (
    <div className="delete-wrapper">
      <div>
        <h2>Are you sure you want to delete your listing?</h2>
        <div>
          {/* <img src={listing.imagesGallery[0]} alt={listing.title} /> */}
          <h3>{listing.title}</h3>
          <p>
            {listing.city}, {listing.country}
          </p>
        </div>
        <div>
          <button
            className="button darkkhaki"
            onClick={(event) => {
              props.history.push(`${PATHS.USER}/${props.user.username}`);
            }}
          >
            No, wait!
          </button>
          <button
            className="button coral"
            onClick={(event) => {
              props.history.push(
                `${PATHS.LISTINGS}/${listingFromProps}/removed`
              );
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
