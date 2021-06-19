import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";
import * as USER_SERVICE from "../../services/user.service";
import ResultCard from "../../components/Result/ResultCard";

export default function GetWishlistItems(props) {
  const [wishlist, setWishlist] = useState([]);
  const usernameFromProps = props.match.params.username;
  const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
  const { user } = props;

  function GetUserWishlistItems() {
    USER_SERVICE.GET_WISHLIST(usernameFromProps, accessToken)
      .then((response) => {
        // console.log("Response from the server: ", response);
        setWishlist(response.data.user.wishlist);
      })
      .catch((err) => {
        console.error("The error is: ", err.response);
      });
  }

  //   function RemoveListingFromWishlist(props) {
  //     USER_SERVICE.WISHLIST_DELETE(usernameFromProps, listingId, accessToken)
  //       .then((response) => {
  //         setWishlist(response.data.user.wishlist);
  //       })
  //       .catch((err) => {
  //         console.error("The error is: ", err.response);
  //       });
  //   }

  useEffect(() => {
    GetUserWishlistItems();
  }, user);

  return (
    <div>
      <h1>This is the wishlist of {usernameFromProps}</h1>
      <Link to={`${PATHS.USER}/${usernameFromProps}`}>
        <button>Back to profile</button>
      </Link>
      {wishlist.map((item) => (
        <ResultCard item={item} key={item._id}>
          <Link to={`${PATHS.LISTINGS}/${item._id}`}>
            <button>View listing</button>
          </Link>

          <button>Remove from wishlist</button>
        </ResultCard>
      ))}
    </div>
  );
}
