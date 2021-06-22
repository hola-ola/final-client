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
  const [user, setUser] = useState({});
  const [owner, setOwner] = useState(true);
  const [receivedReviews, setReceivedReviews] = useState([]);
  const [givenReviews, setGivenReviews] = useState([]);
  const [userListing, setUserListing] = useState({ ...AMENITIES.LISTING_FORM });
  const { authenticate } = props;
  const usernameFromProps = props.match.params.username;
  const loggedUser = props.user.username;
  const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
  const userWishlist = user.wishlist;

  const [displayUpdateProfile, toggleUpdateProfile] = useToggle(false);
  const [displayDeleteProfile, toggleDeleteProfile] = useToggle(false);
  const [displayUpdatePic, toggleUpdatePic] = useToggle(false);
  const [displayAddReview, toggleAddReview] = useToggle(false);
  const [displaySendMessage, toggleSendMessage] = useToggle(false);

  function RefetchUser() {
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
    RefetchUser();
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
      })
      .catch((err) => {
        console.error("The error is: ", err.response);
      });
  }

  // function contactUser() {
  //   MESSAGE_SERVICE.CONTACT_USER(user._id, accessToken)
  //     .then((response) => console.log(response))
  //     .catch((err) => console.log(err));
  // }

  return (
    <div className="user-page">
      <div className="component">
        <div className="user-pic">
          <img src={user.profilePic} alt={user.username}></img>
        </div>

        <div className="user-data">
          <p>
            {user.firstName} {user.lastName} | {user.username}{" "}
          </p>
          <p id="motto">
            My motto: <span>{user.motto}</span>
          </p>
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

          {user.userListing?.length ? (
            <>
              <Link to={`${PATHS.LISTINGS}/${userListing._id}`}>
                <button className="button sandybrown">View listing</button>
              </Link>
            </>
          ) : null}
          {owner && !user.userListing?.length ? (
            <>
              <Link to={`${PATHS.CREATE_LISTING}`}>
                <button className="button darkcyan">Create listing</button>
              </Link>
            </>
          ) : null}

          {displayUpdateProfile && (
            <>
              <UpdateProfile
                user={user}
                authenticate={authenticate}
                {...props}
                refetchUser={RefetchUser}
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
          {displayUpdatePic && (
            <>
              <UpdateProfilePic
                getUser={RefetchUser}
                user={user}
                authenticate={authenticate}
              />
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
          {displaySendMessage && (
            <>
              <SendMessage
                user={user}
                authenticate={authenticate}
                {...props}
                toggleSendMessage={toggleSendMessage}
              ></SendMessage>
            </>
          )}
        </div>
      </div>
      <div>
        <div className="reviews component">
          <h3>Received reviews</h3>

          <div className="component-row">
            {!receivedReviews.length ? (
              <>
                <p>There are no received reviews</p>
              </>
            ) : (
              <>
                {receivedReviews
                  .slice(Math.max(receivedReviews.length - 4, 1))
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

          <div>
            <Link to={`${PATHS.USER}/${usernameFromProps}/reviews`}>
              <button id="view-reviews" className="button darkcyan">
                View all reviews
              </button>
            </Link>
          </div>
        </div>

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
            {!owner && !user?.wishlist?.length && (
              <>
                <p>
                  <h3>User wishlist</h3>
                  {user.username} hasn't added any listings to their wishlist
                  yet
                </p>
              </>
            )}
            {owner && !user?.wishlist?.length && (
              <>
                <h3>Your wishlist</h3>
                <p>You haven't added any listings to your wishlist yet</p>
              </>
            )}
            <h3>Your wishlist</h3>
          </div>

          <div id="wishlist-tiles">
            {user?.wishlist?.length ? (
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
            {user?.wishlist?.length ? (
              <>
                <div id="wishlist-button-section">
                  <Link to={`${PATHS.USER}/${user.username}/wishlist`}>
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
    </div>
  );
}
