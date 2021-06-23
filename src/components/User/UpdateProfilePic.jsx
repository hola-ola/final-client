import React, { useState } from "react";
import useSingleImage from "../../hooks/useSingleImage";
import "../../style/Button.css";

function UpdateProfilePic(props) {
  const { user, getUser } = props;

  const { SingleImageChange, SingleImageSubmit } = useSingleImage(
    user.profilePic,
    getUser
  );

  return (
    <form onSubmit={SingleImageSubmit}>
      <input name="profilePic" onChange={SingleImageChange} type="file"></input>
      <button className="button tan">Submit</button>
    </form>
  );
}

export default UpdateProfilePic;
