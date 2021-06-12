import React, { useState, useEffect } from "react";
import * as CONSTS from "../utils/consts";
import * as PATHS from "../utils/paths";
import * as USER_SERVICE from "../services/user.service.js";
import UpdateProfile from "../components/User/UpdateProfile";
import useToggle from "../hooks/useToggle";
import "./UserPage.css";

export default function UserPage(props) {
  const [user, setUser] = useState({});
  const { authenticate } = props;
  const usernameFromProps = props.match.params.username;
  const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

  const [displayUpdateProfile, toggleUpdateProfile] = useToggle(false);

  useEffect(() => {
    USER_SERVICE.GET_USER(usernameFromProps, accessToken)
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((err) => {
        console.error("This is the error: ", err);
      });
  }, [props.match.params.username]);

  function DeleteProfile() {
    USER_SERVICE.USER_DELETE(usernameFromProps, accessToken)
      .then((response) => {
        console.log("The user has been removed");
        props.history.push(PATHS.HOMEPAGE);
        localStorage.removeItem(CONSTS.ACCESS_TOKEN);
        props.authenticate(null);
      })
      .catch((err) => {
        console.error("The error is: ", err.response);
      });
  }

  return (
    <div className="UserPage">
      <h1>Hello {user.username}, this is your profile</h1>
      <img src="{user.profilePic}" alt={user.username}></img>

      <div>
        <h3>Your personal data</h3>
        <p>First name: {user.firstName}</p>
        <p>Last name: {user.lastName}</p>
        <p>Username: {user.username}</p>
        <p>Bio: {user.userBio}</p>
        <button onClick={toggleUpdateProfile}>Edit profile</button>
        <button onClick={DeleteProfile}>Delete profile</button>
        {displayUpdateProfile && (
          <>
            <UpdateProfile user={user} authenticate={authenticate} {...props} />
          </>
        )}
      </div>

      <div>
        <h3>Recent given reviews</h3>
        <p>To fix when we have adding reviews ready</p>
        <button>View all reviews</button>
      </div>

      <div>
        <h3>Your wishlist</h3>
        <p>To fix when we have adding to wishlist ready</p>
        <button>View the wishlist</button>
      </div>
    </div>
  );
}
