import React from "react";
import { Link } from "react-router-dom";
import * as PATHS from "../../utils/paths";
import "./ShowReview.css";

function ShowReview(props) {
  const { item, index, user } = props;
  const [reviewsAuthor, setReviewsAuthor] = React.useState(true);

  function CheckReviewsAuthor() {
    user.username === item.reviewingUser.username
      ? setReviewsAuthor(true)
      : setReviewsAuthor(false);
  }

  return (
    <div className="one-review">
      <div key={index}>
        <h3>{item.title}</h3>

        {reviewsAuthor ? (
          <>
            <p>Review of {item.reviewedUser.username}</p>
          </>
        ) : (
          <>
            <p>Review by {item.reviewingUser.username}</p>
          </>
        )}

        <p>{item.body}</p>
        <p>{item.startDate.toString()}</p>
        <p>{item.endDate}</p>
      </div>
    </div>
  );
}

export default ShowReview;
