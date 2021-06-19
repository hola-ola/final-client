import React, { useState } from "react";
import * as CONSTS from "../../utils/consts";
import useForm from "../../hooks/useForm.js";
import * as REVIEW_SERVICE from "../../services/review.service.js";

export default function AddReview(props) {
  const {
    user,
    authenticate,
    setReceivedReviews,
    receivedReviews,
    GetReceivedReviews,
  } = props;
  const [thisUser, setThisUser] = useState(user);
  const usernameFromProps = props.match.params.username;
  const loggedUser = user._id;
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

        authenticate(thisUser);
        console.log("The response: ", response);
        console.log("Received reviews: ", receivedReviews);
        GetReceivedReviews();
        // setReceivedReviews([...receivedReviews, response]);
      })
      .catch((err) => {
        console.error(err.response);
      });
  });

  return (
    <form onSubmit={onSubmit}>
      <label>How long have you stayed at {usernameFromProps}'s?</label>
      <br></br>
      <p>Start date: </p>
      <input type="date" name="startDate" onChange={handleChange} />
      <br></br>
      <p>End date: </p>
      <input type="date" name="endDate" onChange={handleChange} />
      <br></br>
      <p>Add your review here:</p>
      <input
        type="text"
        name="title"
        placeholder="Add a title"
        onChange={handleChange}
      />
      <br></br>
      <input
        type="text"
        name="body"
        placeholder="Write your review"
        onChange={handleChange}
      />
      <br></br>
      <label>
        How would you rate {usernameFromProps}? Give a score from 1 to 5.
      </label>
      <br></br>
      <input type="number" name="score" onChange={handleChange} />
      <br></br>
      <button>Submit</button>
      <br></br>
    </form>
  );
}
