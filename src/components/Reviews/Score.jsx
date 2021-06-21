import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

function Score(props) {
  const { children } = props;
  const roundedRating = Math.round(children);

  const starFull = <FaStar />;
  const starsFull = [starFull, starFull, starFull, starFull, starFull];
  const starEmpty = <FaRegStar />;
  const starsEmpty = [starEmpty, starEmpty, starEmpty, starEmpty, starEmpty];

  return (
    <div>
      {starsFull.slice(0, roundedRating)}
      {starsEmpty.slice(0, 5 - roundedRating)}
    </div>
  );
}

export default Score;
