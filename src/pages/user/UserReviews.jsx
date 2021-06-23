import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";
import * as REVIEW_SERVICE from "../../services/review.service";
import ShowReview from "../../components/Reviews/ShowReview";
import "./UserReviews.css";

export default function GetAllReviews(props) {
  const [receivedReviews, setReceivedReviews] = useState([]);
  const [givenReviews, setGivenReviews] = useState([]);
  const usernameFromProps = props.match.params.username;
  const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
  const { user } = props;
  const [owner, setOwner] = useState(true);

  function SetTheOwner() {
    usernameFromProps !== user.username ? setOwner(false) : setOwner(true);
  }

  function GetReceivedReviews() {
    REVIEW_SERVICE.RECEIVED_REVIEWS(usernameFromProps, accessToken)
      .then((response) => {
        setReceivedReviews(response);
      })
      .catch((err) => {
        console.error("The error is: ", err.response);
      });
  }

  function GetGivenReviews() {
    REVIEW_SERVICE.GIVEN_REVIEWS(usernameFromProps, accessToken)
      .then((response) => {
        setGivenReviews(response);
      })
      .catch((err) => {
        console.error("The error is: ", err.response);
      });
  }

  useEffect(() => {
    GetGivenReviews();
    GetReceivedReviews();
    SetTheOwner();
  }, []);

  return (
    <div className="reviews-page">
      <div className="wishlist-top">
        {owner ? (
          <>
            <h3>Your reviews</h3>
          </>
        ) : (
          <>
            <h3>The reviews of/by {usernameFromProps}</h3>
          </>
        )}
        <div className="user-pic">
          <img
            id="profile-pic-wishlist"
            src={user.profilePic}
            alt={user.username}
          ></img>
        </div>

        <Link to={`${PATHS.USER}/${usernameFromProps}`}>
          <button className="button sandybrown">Back to profile</button>
        </Link>
      </div>

      <div>
        <h2>Received reviews</h2>
        <div className="list-of-reviews">
          {receivedReviews.map((item, index) => (
            <ShowReview item={item} key={index} user={user} />
          ))}
        </div>
      </div>

      <div id="given-revs">
        <h2>Given reviews</h2>
        <div className="list-of-reviews">
          {givenReviews.map((item, index) => (
            <ShowReview item={item} key={index} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}
