import React, { useState, useEffect } from "react";
import {
  FaBaby,
  FaDog,
  FaUmbrellaBeach,
  FaRegCalendarCheck,
  FaRegCalendarTimes,
  FaHeart,
  FaHeartBroken,
} from "react-icons/fa";
import { MdSmokingRooms } from "react-icons/md";
import { BiCheck, BiMapPin, BiHomeHeart, BiBed } from "react-icons/bi";
import { FiShare } from "react-icons/fi";
import { Link } from "react-router-dom";

import * as LISTING_SERVICE from "../../services/listing.service";
import * as USER_SERVICE from "../../services/user.service.js";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";
import * as AMENITIES from "../../utils/amenities";

import "./SingleListing.css";
import "../../style/Button.css";

export default function SingleListing(props) {
  const { user, authenticate } = props;
  const [isOwner, setIsOwner] = useState(false);
  const [isOnwishlist, setIsOnWishlist] = useState(false);
  const [listing, setListing] = useState({
    ...AMENITIES.LISTING_FORM,
  });
  const listingFromProps = props.match.params.listingId;
  const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

  function CheckWishlist() {
    user.wishlist.includes(listingFromProps)
      ? setIsOnWishlist(true)
      : setIsOnWishlist(false);
    // console.log("isOnwishlist? ", isOnwishlist);
  }

  function AddToWishlist() {
    LISTING_SERVICE.WISHLIST_ADD(listingFromProps, accessToken)
      .then((response) => {
        console.log("The listing has been added to your wishlist");
        setIsOnWishlist(true);
      })
      .catch((err) => {
        console.error(err.response);
      });
  }

  function RemoveFromWishlist() {
    USER_SERVICE.WISHLIST_DELETE(listingFromProps, user.username, accessToken)
      .then((response) => {
        console.log("The listing has been removed from your wishlist");
        setIsOnWishlist(false);
      })
      .catch((err) => {
        console.error("The error is: ", err.response);
      });
  }

  useEffect(() => {
    // console.log(props.user);
    LISTING_SERVICE.VIEW_LISTING(listingFromProps, accessToken)
      .then((res) => {
        if (!res.data.listing) {
          return props.history.push(PATHS.HOMEPAGE);
        }
        setListing(res.data.listing);
        if (props.user.userListing.includes(listingFromProps)) {
          setIsOwner(true);
        }
      })
      .then(() => {
        CheckWishlist();
      })
      .catch((err) => console.log("This is the error: ", err));
  }, [listingFromProps]);

  const {
    title,
    owner,
    country,
    city,
    lengthOfStay,
    type,
    numberOfSleepingSpots,
    generalDescription,
    kitchenEquipment,
    bathroomEquipment,
    workSetup,
    accessibility,
    smokersWelcome,
    kidsWelcome,
    petsWelcome,
    spaceOutside,
    extraRemarks,
    ambienceLabels,
    imagesGallery,
    availability,
  } = listing;

  let SmallIconSize = "25px";
  let BigIconSize = "35px";

  return (
    <div className="listing-wrapper">
      <div className="listing-header">
        <div className="listing-title">
          <h1>{title}</h1>
          <div className="listing-action-icons">
            <div>
              <Link>
                <FiShare size={SmallIconSize} className="listing-icon" />
              </Link>
              <p>Share</p>
            </div>
            {!isOwner && !isOnwishlist ? (
              <>
                <div>
                  <Link>
                    <FaHeart
                      size={SmallIconSize}
                      className="listing-icon"
                      onClick={AddToWishlist}
                    />
                  </Link>
                  <p>Add to wishlist</p>
                </div>
              </>
            ) : null}
            {!isOwner && isOnwishlist ? (
              <>
                <div>
                  <Link>
                    <FaHeartBroken
                      size={SmallIconSize}
                      className="listing-icon"
                      onClick={RemoveFromWishlist}
                    />
                  </Link>
                  <p>Remove from wishlist</p>
                </div>
              </>
            ) : null}
            {isOwner ? (
              <div>
                <Link
                  to={`${PATHS.LISTINGS}/${listingFromProps}/edit`}
                  className="btn sandybrown"
                >
                  Edit
                </Link>
                <Link
                  to={`${PATHS.LISTINGS}/${listingFromProps}/delete`}
                  className="btn red"
                >
                  Delete
                </Link>
              </div>
            ) : null}
          </div>
        </div>

        <div className="listing-basic-info">
          <div>
            <BiMapPin size={SmallIconSize} />
            <p>
              {city}, {country}
            </p>
          </div>
          <div>
            <BiHomeHeart size={SmallIconSize} />
            <p>{type}</p>
          </div>
          <div>
            <BiBed size={SmallIconSize} />
            <p>Sleep: {numberOfSleepingSpots}</p>
          </div>

          {availability ? (
            <div>
              <FaRegCalendarCheck
                size={SmallIconSize}
                style={{ color: "yellowgreen" }}
              />
              <p>Currently available</p>
            </div>
          ) : (
            <div>
              <FaRegCalendarTimes
                size={SmallIconSize}
                style={{ color: "salmon" }}
              />
              <p>Currently unavailable</p>
            </div>
          )}
        </div>
      </div>

      <div className="listing-content">
        <div className="listing-content-left">
          <div className="listing-info-container">
            {/* About the place */}
            <div className="section-container">
              <div className="section-header">
                <h2>About the place</h2>
              </div>

              <div className="section-content">
                <h3>
                  What {owner.firstName ? owner.firstName : owner.username} says
                  about their place?
                </h3>
                <div className="description">{generalDescription}</div>
              </div>
              <div className="section-content">
                <h3>House rules:</h3>
                <div className="icons-container">
                  <div>
                    <MdSmokingRooms
                      size={BigIconSize}
                      style={{
                        color: smokersWelcome ? "yellowgreen" : "salmon",
                      }}
                    />
                  </div>
                  <div>
                    <FaBaby
                      size={BigIconSize}
                      style={{ color: kidsWelcome ? "yellowgreen" : "salmon" }}
                    />
                  </div>
                  <div>
                    <FaDog
                      size={BigIconSize}
                      style={{ color: petsWelcome ? "yellowgreen" : "salmon" }}
                    />
                  </div>
                  <div>
                    <FaUmbrellaBeach
                      size={BigIconSize}
                      style={{ color: spaceOutside ? "yellowgreen" : "salmon" }}
                    />
                  </div>
                </div>
              </div>
              <div className="section-content">
                <h3>Perfect for:</h3>
                <div className="info-labels">
                  {ambienceLabels.map((item, index) => (
                    <span key={index} className="ambience-label darkcyan">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div></div>
            <div className="section-header">
              <h2>About the area</h2>
            </div>
            {/* About the hood */}
            <div className="section-container">
              <div className="section-content">
                <h3>How is the neighborhood?</h3>
                <div className="description">{extraRemarks}</div>
              </div>
            </div>
            {/* Photos */}
            <div className="section-container">
              <div className="section-header">
                <h2>Photos</h2>
              </div>
              <div>
                {imagesGallery.map((photo, index) => (
                  <img
                    src={imagesGallery[index]}
                    alt={title}
                    width="300px"
                    key={index}
                  ></img>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="listing-content-right">
          <div className="owner-card">
            <h4>Meet the owner</h4>
            <div>
              <img src={owner.profilePic} height="100px" />
              <div className="owner-card-info">
                {owner.firstName ? (
                  <p>
                    {owner.firstName} ({owner.username})
                  </p>
                ) : (
                  <p>{owner.username}</p>
                )}
                <Link
                  to={`${PATHS.USER}/${owner.username}`}
                  className="btn sandybrown"
                >
                  See profile
                </Link>
              </div>
            </div>
          </div>

          <div className="listing-content-checklist">
            <div className="section-header-left">
              <h3>Good to know</h3>
            </div>
            <div className="section-info">
              <h4>Availablility:</h4>
              {lengthOfStay.map((item) => (
                <div className="info-labels">
                  <BiCheck className="listing-icon" />
                  <p>{item}</p>
                </div>
              ))}
            </div>

            <div className="section-info">
              <h4>Kitchen:</h4>
              {kitchenEquipment.map((item) => (
                <div className="info-labels">
                  <BiCheck className="listing-icon" />
                  <p>{item}</p>
                </div>
              ))}
            </div>

            <div className="section-info">
              <h4>Bathroom:</h4>
              {bathroomEquipment.map((item) => (
                <div className="info-labels">
                  <BiCheck className="listing-icon" />
                  <p>{item}</p>
                </div>
              ))}
            </div>

            <div className="section-info">
              <h4>Home office set-up:</h4>
              {workSetup.map((item) => (
                <div className="info-labels">
                  <BiCheck className="listing-icon" />
                  <p>{item}</p>
                </div>
              ))}
            </div>

            <div className="section-info">
              <h4>Accessibility:</h4>
              {accessibility.map((item) => (
                <div className="info-labels">
                  <BiCheck className="listing-icon" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
