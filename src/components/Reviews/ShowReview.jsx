import React, { useEffect } from "react";
import Score from "../../components/Reviews/Score";
import "./ShowReview.css";

function ShowReview(props) {
  // console.log("The props: ", props);
  const { item, index, loggedUser, usernameFromProps } = props;
  const [reviewsAuthor, setReviewsAuthor] = React.useState(true);

  useEffect(() => {
    loggedUser !== item.reviewingUser
      ? setReviewsAuthor(false)
      : setReviewsAuthor(true);
    console.log("reviewsAuthor: ", reviewsAuthor);
  }, usernameFromProps);

  return (
    <div key={index} className="review">
      <div className="one-review">
        <div className="review-pic">
          <img src={item.reviewingUser.profilePic} />
        </div>

        <div className="review-text">
          <p>
            <Score>{item.score}</Score>
          </p>
          <p>"{item.body}"</p>
          <span>{item.reviewingUser.username}</span>
        </div>
      </div>
    </div>
  );
}

export default ShowReview;
