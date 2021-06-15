import React, { useState, useEffect } from "react";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";
import * as USER_SERVICE from "../../services/user.service.js";
import UpdateProfile from "../../components/User/UpdateProfile";
import UpdateProfilePic from "../../components/User/UpdateProfilePic";
import useToggle from "../../hooks/useToggle";
import "./UserPage.css";

export default function UserPage(props) {
  const [user, setUser] = useState({});
  const [owner, setOwner] = useState(true);
  const { authenticate } = props;
  const usernameFromProps = props.match.params.username;
  const loggedUser = props.user.username;
  const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

  const [displayUpdateProfile, toggleUpdateProfile] = useToggle(false);
  const [displayUpdatePic, toggleUpdatePic] = useToggle(false);

  useEffect(() => {
    USER_SERVICE.GET_USER(usernameFromProps, accessToken)
      .then((response) => {
        setUser(response.data.user);
        usernameFromProps !== loggedUser ? setOwner(false) : setOwner(true);
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
    <div className="user-page">
      <div className="user-data">
        <div>
          <img src={user.profilePic} alt={user.username}></img>
          {owner && (
            <>
              <button onClick={toggleUpdatePic}>Update profile pic</button>
            </>
          )}
          {displayUpdatePic && (
            <>
              <UpdateProfilePic user={user} authenticate={authenticate} />
            </>
          )}
        </div>

        <div>
          <h3>Personal details</h3>
          <p>First name: {user.firstName}</p>
          <p>Last name: {user.lastName}</p>
          <p>Username: {user.username}</p>
          <p>Bio: {user.userBio}</p>
          {owner && (
            <>
              <button onClick={toggleUpdateProfile}>Edit profile</button>
              <button onClick={DeleteProfile}>Delete profile</button>
            </>
          )}
          {displayUpdateProfile && (
            <>
              <UpdateProfile
                user={user}
                authenticate={authenticate}
                {...props}
              />
            </>
          )}
        </div>
        {!owner && (
          <>
            <button>Send a message</button>
          </>
        )}

        <div>
          <h3>Received reviews</h3>
          <p>To fix when we have adding reviews ready</p>
          <button>View all reviews</button>
          {!owner && (
            <>
              <button>Add a review</button>
            </>
          )}
        </div>
      </div>

      <div className="user-listing">
        <div>
          <h3>Listing</h3>
          <img src="" alt={`Listing of ${user.username}`}></img>
          {owner && (
            <>
              <button>Edit listing</button>
              <button>Delte listing</button>
            </>
          )}
        </div>
        <div>
          <h3>Wishlist</h3>
          <p>To fix when we have adding to wishlist ready</p>
          <button>View all</button>
        </div>
      </div>
    </div>
  );
}
