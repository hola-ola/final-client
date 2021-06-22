import React, { useState } from "react";
import * as USER_SERVICE from "../../services/user.service";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";

export default function DeleteProfile(props) {
  const { user, authenticate, toggleDeleteProfile } = props;
  const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

  function DeleteThisProfile() {
    USER_SERVICE.USER_DELETE(user._id, accessToken)
      .then((response) => {
        // console.log("The user has been removed");
        props.history.push(PATHS.HOMEPAGE);
        localStorage.removeItem(CONSTS.ACCESS_TOKEN);
        authenticate(null);
      })
      .catch((err) => {
        console.error("The error is: ", err.response);
      });
  }

  return (
    <div>
      <h3>Are you sure you want to delete your profile?</h3>
      <p>Once you confirm, your data will be removed forever</p>
      <button className="button tan" onClick={DeleteThisProfile}>
        Confirm
      </button>
      <button className="button red" onClick={() => toggleDeleteProfile(false)}>
        Cancel
      </button>
    </div>
  );
}
