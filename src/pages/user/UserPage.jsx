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
import SendMessage from "../../components/Inbox/SendMessage";
import ResultCard from "../../components/ResultCard/ResultCard";
import useToggle from "../../hooks/useToggle";
import "./UserPage.css";
import "../../style/Button.css";

export default function UserPage(props) {
  const [thisUser, setThisUser] = useState({});
  const [owner, setOwner] = useState(true);
  const [receivedReviews, setReceivedReviews] = useState([]);
  const [givenReviews, setGivenReviews] = useState([]);
  const [userListing, setUserListing] = useState({ ...AMENITIES.LISTING_FORM });
  const { authenticate } = props;
  const usernameFromProps = props.match.params.username;
  const loggedUser = props.user.username;
  const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
  const userWishlist = thisUser.wishlist;

  const [displayUpdateProfile, toggleUpdateProfile] = useToggle(false);
  const [displayDeleteProfile, toggleDeleteProfile] = useToggle(false);
  const [displayUpdatePic, toggleUpdatePic] = useToggle(false);
  const [displayAddReview, toggleAddReview] = useToggle(false);
  const [displaySendMessage, toggleSendMessage] = useToggle(false);

  function RefetchUser() {
    USER_SERVICE.GET_USER(usernameFromProps, accessToken)
      .then((response) => {
        setThisUser(response.data.user);
        usernameFromProps !== loggedUser ? setOwner(false) : setOwner(true);
      })
      .catch((err) => {
        console.error("This is the error: ", err);
      });
  }

  useEffect(() => {
    RefetchUser();
  }, [props.match.params.username]);

  useEffect(() => {
    GetReceivedReviews();
    GetGivenReviews();
    GetUserListing();
  }, thisUser);

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
      })
      .catch((err) => {
        console.error("The error is: ", err.response);
      });
  }

  function contactUser() {
    MESSAGE_SERVICE.CONTACT_USER(thisUser._id, accessToken)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }

  return (
    <div className="user-page">
      <div className="component">
        <div className="user-pic">
          <img src={thisUser.profilePic} alt={thisUser.username}></img>
        </div>

        <div className="user-data">
          {thisUser.firstName || thisUser.lastName ? (
            <p>
              {thisUser.firstName} {thisUser.lastName} | {thisUser.username}{" "}
            </p>
          ) : (
            <p>{thisUser.username}</p>
          )}

          {thisUser.motto ? (
            <p id="motto">
              My motto: <span>{thisUser.motto}</span>
            </p>
          ) : null}
        </div>

        <div className="user-buttons">
          {owner ? (
            <>
              <button className="button sandybrown" onClick={toggleUpdatePic}>
                Edit profile pic
              </button>
              <button
                className="button sandybrown"
                onClick={toggleUpdateProfile}
              >
                Edit profile
              </button>
              <button className="button red" onClick={toggleDeleteProfile}>
                Delete profile
              </button>
            </>
          ) : (
            <>
              <button className="button sandybrown" onClick={toggleSendMessage}>
                Send a message
              </button>
              <button className="button sandybrown" onClick={toggleAddReview}>
                Add a review
              </button>
            </>
          )}

          {thisUser.userListing?.length ? (
            <>
              <Link to={`${PATHS.LISTINGS}/${userListing._id}`}>
                <button className="button sandybrown">View listing</button>
              </Link>
            </>
          ) : null}
          {owner && !thisUser.userListing?.length ? (
            <>
              <Link to={`${PATHS.CREATE_LISTING}`}>
                <button className="button darkcyan">Create listing</button>
              </Link>
            </>
          ) : null}
        </div>

        <div className="user-forms">
          {displayUpdateProfile && (
            <div className="one-user-form">
              <UpdateProfile
                user={thisUser}
                authenticate={authenticate}
                {...props}
                refetchUser={RefetchUser}
                toggleUpdateProfile={toggleUpdateProfile}
              />
            </div>
          )}
          {displayDeleteProfile && (
            <div className="one-user-form">
              <DeleteProfile
                user={thisUser}
                authenticate={authenticate}
                {...props}
                toggleDeleteProfile={toggleDeleteProfile}
              />
            </div>
          )}
          {displayUpdatePic && (
            <div className="one-user-form">
              <UpdateProfilePic
                getUser={RefetchUser}
                user={thisUser}
                authenticate={authenticate}
              />
            </div>
          )}
          {displayAddReview && (
            <div className="one-user-form">
              <AddReview
                user={thisUser}
                authenticate={authenticate}
                {...props}
                setReceivedReviews={setReceivedReviews}
                receivedReviews={receivedReviews}
                GetReceivedReviews={GetReceivedReviews}
                toggleAddReview={toggleAddReview}
              ></AddReview>
            </div>
          )}
          {displaySendMessage && (
            <div className="one-user-form">
              <SendMessage
                user={thisUser}
                authenticate={authenticate}
                {...props}
                toggleSendMessage={toggleSendMessage}
              ></SendMessage>
            </div>
          )}
        </div>
      </div>
      <div className="reviews-section">
        <h3>Reviews</h3>
        {!receivedReviews.length ? (
          <>
            <p className="no-reviews">No reviews yet</p>
          </>
        ) : (
          <>
            <div className="component-row">
              {receivedReviews
                .slice(Math.max(receivedReviews.length - 4, 1))
                .map((item) => (
                  <ShowReview
                    item={item}
                    key={item._id}
                    loggedUser={loggedUser}
                    thisUser={thisUser}
                  />
                ))}
            </div>
            <div>
              <Link to={`${PATHS.USER}/${usernameFromProps}/reviews`}>
                <button id="view-reviews-btn" className="button darkcyan">
                  View all reviews
                </button>
              </Link>
            </div>
          </>
        )}
      </div>

      {/* <h3>Given reviews</h3>
            <div className="reviews-row">
              {!givenReviews.length ? (
                <>
                  <p>There are no given reviews</p>
                </>
              ) : (
                <>
                  {givenReviews
                    .slice(Math.max(givenReviews.length - 4, 1))
                    .map((item) => (
                      <ShowReview
                        item={item}
                        key={item._id}
                        loggedUser={loggedUser}
                        usernameFromProps={usernameFromProps}
                      />
                    ))}
                </>
              )}
            </div> */}

      {/*
            <div className="listing">
              {!owner && !user?.userListing?.length ? (
                <>
                  <h3>User listing</h3>
                  <p>{user.username} hasn't created a listing yet</p>
                </>
              ) : null}
              {owner && !user?.userListing?.length ? (
                <>
                  <h3>Your listing</h3>
                  <p>You haven't created a listing yet</p>
                  <Link to={`${PATHS.CREATE_LISTING}`}>
                    <button className="button darkcyan">
                      Create a listing
                    </button>
                  </Link>
                </>
              ) : null}
              {!owner && user?.userListing?.length ? (
                <>
                  <h3>User listing</h3>
                  <ResultCard item={userListing} key={user.userListing._id}>
                    View listing
                  </ResultCard>
                </>
              ) : null}
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
            </div> */}

      <div class="wishlist-section">
        <div>
          {!owner && !thisUser?.wishlist?.length && (
            <div className="no-wishlist">
              <p>
                <h3>Wishlist</h3>
                {thisUser.username} hasn't added any listings to the wishlist
                yet
              </p>
            </div>
          )}
          {owner && !thisUser?.wishlist?.length && (
            <>
              <h3>Wishlist</h3>
              <p>You haven't added any listings to your wishlist yet</p>
              <Link to={PATHS.SEARCH_RESULTS}>
                <button id="explore-listings-btn" className="button tan">
                  Explore the listings!
                </button>
              </Link>
            </>
          )}
        </div>

        <div id="wishlist-tiles">
          {thisUser?.wishlist?.length ? (
            <>
              {userWishlist.slice(0, 4).map((item) => (
                <ResultCard item={item} key={item._id}>
                  View listing
                </ResultCard>
              ))}
            </>
          ) : null}
        </div>

        <div>
          {thisUser?.wishlist?.length ? (
            <>
              <div id="wishlist-button-section">
                <Link to={`${PATHS.USER}/${thisUser.username}/wishlist`}>
                  <button className="button darkcyan" id="view-wishlist-btn">
                    View wishlist
                  </button>
                </Link>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
