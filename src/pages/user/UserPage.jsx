import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";
import * as AMENITIES from "../../utils/amenities";
import * as USER_SERVICE from "../../services/user.service.js";
import * as REVIEW_SERVICE from "../../services/review.service";
import * as LISTING_SERVICE from "../../services/listing.service";
import * as MESSAGE_SERVICE from "../../services/message.service";
import UpdateProfile from "../../components/User/UpdateProfile";
import UpdateProfilePic from "../../components/User/UpdateProfilePic";
import DeleteProfile from "../../components/User/DeleteProfile";
import AddReview from "../../components/Reviews/AddReview";
import ShowReview from "../../components/Reviews/ShowReview";
import ResultCard from "../../components/Result/ResultCard";
import AllReviews from "../../pages/reviews/AllReviews";
import useToggle from "../../hooks/useToggle";
import "./UserPage.css";

export default function UserPage(props) {
  const [user, setUser] = useState({});
  const [owner, setOwner] = useState(true);
  const [receivedReviews, setReceivedReviews] = useState([]);
  const [givenReviews, setGivenReviews] = useState([]);
  const [userListing, setUserListing] = useState({ ...AMENITIES.LISTING_FORM });
  const { authenticate } = props;
  const usernameFromProps = props.match.params.username;
  const loggedUser = props.user.username;
  const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

  const [displayUpdateProfile, toggleUpdateProfile] = useToggle(false);
  const [displayDeleteProfile, toggleDeleteProfile] = useToggle(false);
  const [displayUpdatePic, toggleUpdatePic] = useToggle(false);
  const [displayAddReview, toggleAddReview] = useToggle(false);

  function refetchUser() {
    USER_SERVICE.GET_USER(usernameFromProps, accessToken)
      .then((response) => {
        setUser(response.data.user);
        usernameFromProps !== loggedUser ? setOwner(false) : setOwner(true);
      })
      .catch((err) => {
        console.error("This is the error: ", err);
      });
  }

  useEffect(() => {
    refetchUser();
    GetUserListing();
  }, [props.match.params.username]);

  useEffect(() => {
    GetReceivedReviews();
    GetGivenReviews();
  }, user);

  function GetReceivedReviews() {
    REVIEW_SERVICE.RECEIVED_REVIEWS(usernameFromProps, accessToken)
      .then((response) => {
        setReceivedReviews(response);
      })
      .catch((err) => {
        console.error("The error is: ", err.response);
      });
  }

  function GetGivenReviews() {
    REVIEW_SERVICE.GIVEN_REVIEWS(usernameFromProps, accessToken)
      .then((response) => {
        setGivenReviews(response);
      })
      .catch((err) => {
        console.error("The error is: ", err.response);
      });
  }

  function GetUserListing() {
    LISTING_SERVICE.VIEW_USER_LISTING(usernameFromProps, accessToken)
      .then((response) => {
        setUserListing(response.data.listing);
        // console.log(
        //   "This is the listing of this user: ",
        //   response.data.listing
        // );
      })
      .catch((err) => {
        console.error("The error is: ", err.response);
      });
  }

  function contactUser() {
    MESSAGE_SERVICE.CONTACT_USER(user._id, accessToken)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }

  return (
    <div className="user-page">
      <div className="user-data">
        <div>
          <img width="200" src={user.profilePic} alt={user.username}></img>
          {owner && (
            <>
              <button onClick={toggleUpdatePic}>Update profile pic</button>
            </>
          )}
          {displayUpdatePic && (
            <>
              <UpdateProfilePic
                getUser={refetchUser}
                user={user}
                authenticate={authenticate}
              />
            </>
          )}
        </div>
        {!owner ? <button onClick={contactUser}>Contact user</button> : null}
        <div>
          <h3>Personal details</h3>
          <p>First name: {user.firstName}</p>
          <p>Last name: {user.lastName}</p>
          <p>Username: {user.username}</p>
          <p>Bio: {user.userBio}</p>
          {owner && (
            <>
              <button onClick={toggleUpdateProfile}>Edit profile</button>
              <button onClick={toggleDeleteProfile}>Delete profile</button>
            </>
          )}
          {displayUpdateProfile && (
            <>
              <UpdateProfile
                user={user}
                authenticate={authenticate}
                {...props}
                refetchUser={refetchUser}
                toggleUpdateProfile={toggleUpdateProfile}
              />
            </>
          )}
          {displayDeleteProfile && (
            <>
              <DeleteProfile
                user={user}
                authenticate={authenticate}
                {...props}
                toggleDeleteProfile={toggleDeleteProfile}
              />
            </>
          )}
        </div>
        {!owner && (
          <>
            <button>Send a message</button>
            <button onClick={toggleAddReview}>Add a review</button>
          </>
        )}
        {displayAddReview && (
          <>
            <AddReview
              user={user}
              authenticate={authenticate}
              {...props}
              setReceivedReviews={setReceivedReviews}
              receivedReviews={receivedReviews}
              GetReceivedReviews={GetReceivedReviews}
              toggleAddReview={toggleAddReview}
            ></AddReview>
          </>
        )}

        <div>
          <div>
            <h2>REVIEWS</h2>

            <Link to={`${PATHS.USER}/${usernameFromProps}/reviews`}>
              <button>View all reviews</button>
            </Link>
          </div>

          <div>
            <h3>Received reviews</h3>
            {receivedReviews.slice(0, 4).map((item) => (
              <ShowReview item={item} key={item._id} user={user} {...props} />
            ))}
          </div>

          <div>
            <h3>Given reviews</h3>
            {givenReviews.slice(0, 4).map((item) => (
              <ShowReview item={item} key={item._id} user={user} />
            ))}
          </div>
        </div>
      </div>

      <div className="user-listing">
        <div>
          <h3>Listing</h3>
          {!owner && !user?.userListing?.length && (
            <>
              <p>{user.username} hasn't created a listing yet</p>
            </>
          )}
          {owner && !user?.userListing?.length && (
            <>
              <p>You haven't created a listing yet</p>
              <Link to={`${PATHS.CREATE_LISTING}`}>
                <button>Create a listing</button>
              </Link>
            </>
          )}
          {!owner && user?.userListing?.length && (
            <>
              <ResultCard item={userListing} key={userListing._id}>
                View listing
              </ResultCard>
            </>
          )}
          {owner && user?.userListing?.length ? (
            <>
              <ResultCard item={userListing} key={userListing._id}>
                <button>View listing</button>
              </ResultCard>
              <Link to={`${PATHS.LISTINGS}/${userListing._id}/edit`}>
                <button>Edit listing</button>
              </Link>
              <Link to={`${PATHS.LISTINGS}/${userListing._id}/delete`}>
                <button>Delete listing</button>
              </Link>
            </>
          ) : null}
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
