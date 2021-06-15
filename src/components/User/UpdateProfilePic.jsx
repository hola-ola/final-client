import React, { useState } from "react";
import * as USER_SERVICE from "../../services/user.service";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";
import useSingleImage from "../../hooks/useSingleImage";

function UpdateProfilePic(props) {
  const { user, authenticate } = props;
  const [error, setError] = useState(null);

  const [form, singleImage, SingleImageChange, SingleImageSubmit] =
    useSingleImage(user.profilePic);

  return (
    <form onSubmit={SingleImageSubmit}>
      <input name="profilePic" onChange={SingleImageChange} type="file"></input>
      <button>Submit</button>
    </form>
  );
}

export default UpdateProfilePic;
