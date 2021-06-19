import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";
import * as REVIEW_SERVICE from "../../services/review.service";
import ShowReview from "../../components/Reviews/ShowReview";

export default function GetAllReviews(props) {
  const [receivedReviews, setReceivedReviews] = useState([]);
  const [givenReviews, setGivenReviews] = useState([]);
  const usernameFromProps = props.match.params.username;
  const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
  const { user } = props;

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
  }, []);

  return (
    <div>
      <h1>These are all reviews of {usernameFromProps}</h1>
      <Link to={`${PATHS.USER}/${usernameFromProps}`}>
        <button>Back to profile</button>
      </Link>
      <h2>Received reviews</h2>
      <div>
        {receivedReviews.map((item, index) => (
          <ShowReview item={item} key={index} user={user} />
        ))}
      </div>

      <h2>Given reviews</h2>
      {givenReviews.map((item, index) => (
        <ShowReview item={item} key={index} user={user} />
      ))}
    </div>
  );
}
