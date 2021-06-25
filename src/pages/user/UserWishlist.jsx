import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";
import * as USER_SERVICE from "../../services/user.service";
import ResultCardWishlist from "../../components/ResultCard/ResultCardWishlist";
import "../../style/Button.css";
import "../user/UserPage.css";
import "./UserWishlist.css";

export default function GetWishlistItems(props) {
  const [wishlist, setWishlist] = useState([]);
  const usernameFromProps = props.match.params.username;
  const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
  const { user } = props;
  const [thisUser, setThisUser] = useState(true);
  const [owner, setOwner] = useState(true);

  function RefetchUser() {
    USER_SERVICE.GET_USER(usernameFromProps, accessToken)
      .then((response) => {
        setThisUser(response.data.user);
        usernameFromProps !== user.username ? setOwner(false) : setOwner(true);
      })
      .catch((err) => {
        console.error("This is the error: ", err);
      });
  }

  function GetUserWishlistItems() {
    USER_SERVICE.GET_WISHLIST(usernameFromProps, accessToken)
      .then((response) => {
        // console.log("Response from the server: ", response);
        setWishlist(response.data.user.wishlist);
        console.log(response.data.user);
        setThisUser(response.data.user);
        console.log("thisUser", thisUser);
        RefetchUser();
      })
      .catch((err) => {
        console.error("The error is: ", err.response);
      });
  }

  function RemoveListing(key) {
    // console.log("Remove from wishlist - step 1");
    // console.log("key: ", key);
    USER_SERVICE.WISHLIST_DELETE(key, usernameFromProps, accessToken)
      .then((response) => {
        GetUserWishlistItems();
        // console.log("HERE ", response.data.user.wishlist);
        setWishlist(response.data.user.wishlist);
      })
      .catch((err) => {
        console.error("The error is: ", err.response);
      });
  }

  useEffect(() => {
    GetUserWishlistItems();
  }, [props.match.params.username]);

  return (
    <div>
      <div className="wishlist-top">
        {owner ? (
          <>
            <h3>Your wishlist</h3>
          </>
        ) : (
          <>
            <h3>The wishlist of {usernameFromProps}</h3>
          </>
        )}
        <div className="user-pic">
          <img
            id="profile-pic-wishlist"
            src={thisUser.profilePic}
            alt={thisUser.username}
          ></img>
        </div>
        <Link to={`${PATHS.USER}/${usernameFromProps}`}>
          <button className="button sandybrown">Back to profile</button>
        </Link>
      </div>

      <div className="list-of-items">
        {wishlist.map((item, index) => (
          <ResultCardWishlist
            item={item}
            key={item._id}
            index={index}
            RemoveListing={RemoveListing}
            owner={owner}
          >
            View listing
          </ResultCardWishlist>
        ))}
      </div>
    </div>
  );
}
