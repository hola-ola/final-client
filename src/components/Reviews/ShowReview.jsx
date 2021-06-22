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
      <p>
        <img src={item.reviewingUser.profilePic} />
      </p>

      <p className="review-text">"{item.title}"</p>
      <Score>{item.score}</Score>
      <p className="review-text">{item.body}</p>
      <p>
        <span>{item.reviewingUser.username}</span>
      </p>
    </div>
  );
}

export default ShowReview;
