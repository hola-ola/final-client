import React, { useState } from "react";
import * as USER_SERVICE from "../../services/user.service";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";
import useSingleImage from "../../hooks/useSingleImage";

function UpdateProfilePic(props) {
  const { user, getUser } = props;
  const [error, setError] = useState(null);

  const { SingleImageChange, SingleImageSubmit } = useSingleImage(
    user.profilePic,
    getUser
  );

  return (
    <form onSubmit={SingleImageSubmit}>
      <input name="profilePic" onChange={SingleImageChange} type="file"></input>
      <button>Submit</button>
    </form>
  );
}

export default UpdateProfilePic;
