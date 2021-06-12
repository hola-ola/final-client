import React, { useState, useEffect } from "react";
import * as LISTING_SERVICE from "../../services/listing.service";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";
import * as AMENITIES from "../../utils/amenities";

export default function SingleListing(props) {
  const [listing, setListing] = useState({
    ...AMENITIES.LISTING_FORM,
  });
  const listingFromProps = props.match.params.listingId;
  const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

  useEffect(() => {
    LISTING_SERVICE.VIEW_LISTING(listingFromProps, accessToken)
      .then((res) => {
        if (!res.data.listing) {
          return props.history.push(PATHS.HOMEPAGE);
        }
        setListing(res.data.listing);
      })
      .catch((err) => console.log("This is the error: ", err));
  }, [listingFromProps]);

  const {
    title,
    city,
    country,
    type,
    numberOfSleepingSpots,
    lengthOfStay,
    kitchenEquipment,
    bathroomEquipment,
    workSetup,
    imagesGallery,
  } = listing;

  console.log(listing);
  return (
    <div>
      <h1>{title}</h1>
      <div>
        <p>
          Location: {city}, {country}
        </p>
      </div>
      <div>
        <p>Owner: TBD</p>
      </div>
      <div>
        <p>Type: {type}</p>
        <div>
          Available for:{" "}
          {lengthOfStay.map((item) => (
            <p>{item}</p>
          ))}
        </div>
      </div>
      <div>
        <h2>About the flat</h2>
        <p>Sleeps: {numberOfSleepingSpots}</p>
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
        <div>Accessibility:</div>
      </div>

      <div>
        <h2>Photos:</h2>
        {imagesGallery.map((photo, index) => (
          <img src={imagesGallery[index]} alt={title} width="300px"></img>
        ))}
      </div>
    </div>
  );
}
