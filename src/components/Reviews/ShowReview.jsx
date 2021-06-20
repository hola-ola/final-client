import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import * as PATHS from "../../utils/paths";
import "./ShowReview.css";

function ShowReview(props) {
  console.log("The props: ", props);
  const { item, index, loggedUser, usernameFromProps } = props;
  const [reviewsAuthor, setReviewsAuthor] = React.useState(true);

  useEffect(() => {
    loggedUser !== usernameFromProps
      ? setReviewsAuthor(false)
      : setReviewsAuthor(true);
  }, loggedUser);

  return (
    <div className="one-review">
      <div key={index}>
        <h4>{item.title}</h4>

        {reviewsAuthor && item?.reviewingUser?.username ? (
          <>
            Review of{" "}
            <Link to={`${PATHS.USER}/${item.reviewedUser.username}`}>
              {item.reviewedUser.username}
            </Link>
          </>
        ) : null}
        {!reviewsAuthor && item?.reviewedUser?.username ? (
          <>
            <p>
              Review by{" "}
              <Link to={`${PATHS.USER}/${item.reviewingUser.username}`}>
                {item.reviewingUser.username}
              </Link>
            </p>
          </>
        ) : null}

        <p>{item.body}</p>
      </div>
    </div>
  );
}

export default ShowReview;
