import React from "react";
import * as LISTING_SERVICE from "../../services/listing.service";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";

export default function RemovedListing(props) {
  const listingFromProps = props.match.params.listingId;
  const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

  LISTING_SERVICE.REMOVE_LISTING(listingFromProps, accessToken)
    .then((res) => {
      console.log(res);
      if (!res.data.listing) {
        return props.history.push(PATHS.HOMEPAGE);
      }
      console.log("Listing removed");
    })
    .catch((err) => console.log("This is the error:", err));

  return (
    <div>
      <h2>Your listing has been removed</h2>
      <button
        onClick={(event) => {
          props.history.push(PATHS.HOMEPAGE);
        }}
      >
        Go to homepage
      </button>
    </div>
  );
}
