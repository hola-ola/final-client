import React, { useState } from "react";
import * as CONSTS from "../utils/consts";
import * as USER_SERVICE from "../services/user.service.js";

function EditProfile() {
  console.log("So you want to edit your profile? Okay!");
}

function DeleteProfile() {
  console.log("Are you sure you want to remove your profile?");
}

export default function UserPage(props) {
  const [user, setUser] = useState({});
  const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
  const usernameFromProps = props.match.params.username;

  USER_SERVICE.GET_USER(usernameFromProps, accessToken)
    .then((response) => {
      console.log("This is the response: ", response);
      setUser(response.data.user);
    })
    .catch((err) => {
      console.error("This is the error: ", err);
    });

  return (
    <div className="UserPage">
      <h1>Hello {user.username}, this is your profile</h1>
      <img src="{user.profilePic}" alt={user.username}></img>

      <div>
        <h3>Your personal data</h3>
        <p>First name: {user.firstName}</p>
        <p>Last name: {user.lastName}</p>
        <p>Username: {user.username}</p>
        <button onClick={EditProfile}>Edit your profile</button>
        <button onClick={DeleteProfile}>Remove your profile</button>
      </div>

      <div>
        <h3>Recent given reviews</h3>
        <p>To fix when we have adding reviews ready</p>
        <button>View all reviews</button>
      </div>

      <div>
        <h3>Your wishlist</h3>
        <p>To fix when we have adding to wishlist ready</p>
        <button>View whole wishlist</button>
      </div>
    </div>
  );
}
