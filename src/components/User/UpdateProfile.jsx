import React, { useState } from "react";
import * as USER_SERVICE from "../../services/user.service";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";
import useForm from "../../hooks/useForm.js";
import "./UpdateProfile.css";

function UpdateProfile(props) {
  const { user, authenticate, refetchUser, toggleUpdateProfile } = props;
  const [error, setError] = useState(null);

  const [
    form,
    handleChange,
    handleSubmit,
    inputProps,
    images,
    handleImageChange,
  ] = useForm({
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    motto: user.motto,
  });

  const onSubmit = handleSubmit((form, image) => {
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    const editedValues = { ...form };

    USER_SERVICE.UPDATE_USER(editedValues, accessToken)
      .then((response) => {
        // console.log("This is updated user: ", response.data);
        authenticate(response.data.user);
        refetchUser();
        toggleUpdateProfile(false);
        props.history.push({
          pathname: `${PATHS.USER}/${response.data.user.username}`,
        });
      })
      .catch((err) => {
        console.error(err.response);
      });
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="update-profile">
        <div>
          <label>First name</label>
          <input
            name="firstName"
            placeholder="First name"
            value={form.firstName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Last name</label>
          <input
            name="lastName"
            placeholder="Last name"
            value={form.lastName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Username</label>
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Your motto</label>
          <input
            name="motto"
            placeholder="Your motto"
            value={form.motto}
            onChange={handleChange}
            type="textarea"
          />
        </div>
      </div>
      <div id="update-profile-btn">
        <button className="button tan">Submit</button>
      </div>

      {error && (
        <div className="error-block">
          <p>{error.errorMessage}</p>
        </div>
      )}
    </form>
  );
}

export default UpdateProfile;
