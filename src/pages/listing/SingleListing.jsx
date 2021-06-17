import React, { useState, useEffect } from "react";
import {
  FaBed,
  FaBaby,
  FaDog,
  FaUmbrellaBeach,
  FaRegCalendarCheck,
  FaRegCalendarTimes,
  FaRegHeart,
} from "react-icons/fa";
import { MdSmokingRooms } from "react-icons/md";
import { BiMapPin, BiHomeHeart, BiBed } from "react-icons/bi";
import { FiShare } from "react-icons/fi";
import { Link } from "react-router-dom";

import * as LISTING_SERVICE from "../../services/listing.service";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";
import * as AMENITIES from "../../utils/amenities";

import "./SingleListing.css";

export default function SingleListing(props) {
  const [listing, setListing] = useState({
    ...AMENITIES.LISTING_FORM,
  });

  const [isOwner, setIsOwner] = useState(false);
  const listingFromProps = props.match.params.listingId;
  const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

  useEffect(() => {
    LISTING_SERVICE.VIEW_LISTING(listingFromProps, accessToken)
      .then((res) => {
        if (!res.data.listing) {
          return props.history.push(PATHS.HOMEPAGE);
        }
        if (props.user.userListing.includes(listingFromProps)) {
          setIsOwner(true);
        }
        setListing(res.data.listing);
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
            <div>
              <Link>
                <FaRegHeart size={SmallIconSize} className="listing-icon" />
              </Link>
              <p>Add to wishlist</p>
            </div>
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
            <Link to={`${PATHS.USER}/${owner.username}`}>
              See user's profile
            </Link>
          </div>
        </div>
      </div>

      <div>
        <div>
          Available for:{" "}
          {lengthOfStay.map((item) => (
            <p>{item}</p>
          ))}
        </div>
      </div>

      <div>
        <h2>About the flat</h2>
        <div className="icons-container">
          <div>
            <MdSmokingRooms
              size={BigIconSize}
              style={{ color: smokersWelcome ? "yellowgreen" : "salmon" }}
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
        <div>
          Kitchen:{" "}
          {kitchenEquipment.map((item) => (
            <p>{item}</p>
          ))}
        </div>
        <div>
          Bathroom:{" "}
          {bathroomEquipment.map((item) => (
            <p>{item}</p>
          ))}
        </div>
        <div>
          Home office set-up:{" "}
          {workSetup.map((item) => (
            <p>{item}</p>
          ))}
        </div>
        <div>
          <p></p>Accessibility:
          <div>
            {accessibility.map((item) => (
              <p>{item}</p>
            ))}
          </div>
        </div>
        <div>
          <h3>What ({owner.username}) says about their place:</h3>
          <div>{generalDescription}</div>
        </div>
      </div>

      <div>
        <h2>About the area</h2>
        <div>
          <h3>Perfect for:</h3>
          <div>
            {ambienceLabels.map((item) => (
              <p>{item}</p>
            ))}
          </div>
        </div>
        <div>
          <h3>What {owner.username} says about the neighborhood:</h3>
          <div>{extraRemarks}</div>
        </div>
      </div>

      <div>
        <h2>Photos:</h2>
        {imagesGallery.map((photo, index) => (
          <img
            src={imagesGallery[index]}
            alt={title}
            width="300px"
            key={index}
          ></img>
        ))}
      </div>

      {isOwner ? (
        <div>
          <Link to={`${PATHS.LISTINGS}/${listingFromProps}/edit`}>Edit</Link>
          <Link to={`${PATHS.LISTINGS}/${listingFromProps}/delete`}>
            Delete
          </Link>
        </div>
      ) : null}
    </div>
  );
}
