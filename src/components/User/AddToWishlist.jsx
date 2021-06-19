import React from "react";
import * as CONSTS from "../../utils/consts";
import * as USER_SERVICE from "../../services/user.service.js";

export default function AddToWishlist(props) {
  console.log(props);
  const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
  const listingId = props.match.params;

  USER_SERVICE.WISHLIST_ADD(listingId, accessToken)
    .then((response) => {})
    .catch((err) => {
      console.error(err.response);
    });
}
