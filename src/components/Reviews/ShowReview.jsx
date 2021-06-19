import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import * as PATHS from "../../utils/paths";
import "./ShowReview.css";

function ShowReview(props) {
  console.log(props);
  const { item, index, user } = props;
  const [reviewsAuthor, setReviewsAuthor] = React.useState(true);

  useEffect(() => {
    user.username === props.match.params.username
      ? setReviewsAuthor(true)
      : setReviewsAuthor(false);
  }, []);

  console.log("ITEMS VALUE", item);

  return (
    <div className="one-review">
      <div key={index}>
        <h4>{item.title}</h4>

        {/* {reviewsAuthor ? (
          <>
            <Link to={`${PATHS.USER}/${item.reviewedUser.username}`}>
              <p>Review of {item.reviewedUser.username}</p>
            </Link>
          </>
        ) : (
          <>
            <p>
              Review by{" "}
              <Link to={`${PATHS.USER}/${item.reviewingUser.username}`}>
                {item.reviewingUser.username}
              </Link>
            </p>
          </>
        )} */}

        <p>{item.body}</p>
      </div>
    </div>
  );
}

export default ShowReview;
