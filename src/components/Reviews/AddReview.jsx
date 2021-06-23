import React, { useState } from "react";
import * as CONSTS from "../../utils/consts";
import useForm from "../../hooks/useForm.js";
import * as REVIEW_SERVICE from "../../services/review.service.js";
import "../../style/Button.css";
import "./AddReview.css";

export default function AddReview(props) {
  const {
    user,
    authenticate,
    setReceivedReviews,
    receivedReviews,
    GetReceivedReviews,
    toggleAddReview,
  } = props;
  const usernameFromProps = props.match.params.username;
  const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

  const [
    form,
    handleChange,
    handleSubmit,
    inputProps,
    images,
    handleImageChange,
  ] = useForm();

  const onSubmit = handleSubmit((form) => {
    // console.log("Let's add the user review! Start here!");
    REVIEW_SERVICE.ADD_REVIEW(
      usernameFromProps,
      { form: { ...form } },
      accessToken
    )
      .then((response) => {
        // console.log("Server response review: ", response);
        // console.log("Here we set the user to display new review");

        authenticate(user);
        // console.log("The response: ", response);
        // console.log("Received reviews: ", receivedReviews);
        GetReceivedReviews();
        toggleAddReview(false);
        setReceivedReviews([...receivedReviews, response]);
      })
      .catch((err) => {
        // console.error(err.response);
      });
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="add-review">
        <p>You are reviewing {usernameFromProps}</p>
        <input
          type="text"
          name="title"
          placeholder="Add a title"
          onChange={handleChange}
        />
        <textarea
          type="text"
          name="body"
          placeholder="Write your review"
          onChange={handleChange}
        />
        <p>
          Score from 1 to 5:{" "}
          <input
            id="score"
            type="number"
            name="score"
            onChange={handleChange}
          />
        </p>

        <button className="button sandybrown">Submit</button>
      </div>
    </form>
  );
}
