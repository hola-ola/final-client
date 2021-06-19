import React, { useState, useEffect } from "react";
import * as LISTING_SERVICE from "../../services/listing.service";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";
import * as AMENITIES from "../../utils/amenities";
import useForm from "../../hooks/useForm";

export default function EditListing(props) {
  const [listing, setListing] = useState({});

  const [
    form,
    handleChange,
    handleSubmit,
    inputProps,
    images,
    handleImageChange,
    overrideForm,
  ] = useForm(listing);

  const [error, setError] = React.useState(null);

  const listingFromProps = props.match.params.listingId;
  const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);

  useEffect(() => {
    LISTING_SERVICE.EDIT_LISTING(listingFromProps, accessToken)
      .then((res) => {
        if (!res) {
          return props.history.push(PATHS.HOMEPAGE);
        }
        if (!res.data.listing) {
          return props.history.push(PATHS.HOMEPAGE);
        }
        setListing(res.data.listing);
        overrideForm(res.data.listing);
      })
      .catch((err) => {
        console.log("This is the error:", err);
      });
  }, [listingFromProps]);

  const onSubmit = handleSubmit((formValues, imagesGallery) => {
    const editedValues = { ...formValues, imagesGallery };
    LISTING_SERVICE.EDITED_LISTING(editedValues, listingFromProps, accessToken)
      .then((response) => {
        if (!response) {
          return console.log("NO RESPONSE");
        }
        return props.history.push(`${PATHS.LISTINGS}/${listing._id}`);
      })
      .catch((err) => {
        console.error("This is the error: ", err.response);
      });
  });

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
  } = form;

  return (
    <div className="create-listing-wrapper">
      <h1>Edit your listing</h1>
      <form onSubmit={onSubmit}>
        <div>
          <p>Title</p>
          <input {...inputProps("title")} value={title} />
          {error?.key === "title" && (
            <p className="errorMessage">{error.message}</p>
          )}
        </div>

        <div>
          <p>Country</p>
          <input {...inputProps("country")} placeholder={country} />
        </div>

        <div>
          <p>City</p>
          <input {...inputProps("city")} placeholder={city} />
        </div>

        <div>
          <p>Possible length of stay</p>
          <div className="checkbox-container">
            {AMENITIES.LENGTH_OF_STAY.map((item, index) => (
              <CheckboxInput
                key={index}
                {...inputProps("lengthOfStay", { item })}
              />
            ))}
          </div>
        </div>

        <div>
          <p>Type</p>
          <div className="checkbox-container">
            {AMENITIES.LISTING_TYPE.map((item, index) => (
              <CheckboxInput key={index} {...inputProps("type", { item })} />
            ))}
          </div>
        </div>

        <div>
          <p>Number of sleeping spots</p>
          <div className="checkbox-container">
            {AMENITIES.SLEEPS.map((item, index) => (
              <CheckboxInput
                key={index}
                {...inputProps("numberOfSleepingSpots", { item })}
              />
            ))}
          </div>
        </div>

        <div>
          <p>Kitchen equipment</p>
          <div className="checkbox-container">
            {AMENITIES.KITCHEN_EQUIPMENT.map((item, index) => (
              <CheckboxInput
                key={index}
                {...inputProps("kitchenEquipment", { item })}
              />
            ))}
          </div>
        </div>

        <div>
          <p>Bathroom equipment</p>
          <div className="checkbox-container">
            {AMENITIES.BATHROOM_EQUIPMENT.map((item, index) => (
              <CheckboxInput
                key={index}
                {...inputProps("bathroomEquipment", { item })}
              />
            ))}
          </div>
        </div>

        <div>
          <p>Work setup</p>
          <div className="checkbox-container">
            {AMENITIES.WORK_SETUP.map((item, index) => (
              <CheckboxInput
                key={index}
                {...inputProps("workSetup", { item })}
              />
            ))}
          </div>
        </div>

        <div>
          <p>Accessibility</p>
          <div className="checkbox-container">
            {AMENITIES.ACCESSIBILITY.map((item, index) => (
              <CheckboxInput
                key={index}
                {...inputProps("accessibility", { item })}
              />
            ))}
          </div>
        </div>

        <div>
          <p>Is smoking allowed?</p>
          <div className="radio-container">
            <RadioInput
              {...inputProps("smokersWelcome", {
                value: true,
                checked: form.smokersWelcome,
              })}
            >
              Yes
            </RadioInput>
            <RadioInput
              {...inputProps("smokersWelcome", {
                value: false,
                checked: !form.smokersWelcome,
              })}
            >
              No
            </RadioInput>
          </div>
        </div>

        <div>
          <p>Are kids welcome?</p>
          <div className="radio-container">
            <RadioInput
              {...inputProps("kidsWelcome", {
                value: true,
                checked: form.kidsWelcome,
              })}
            >
              Yes
            </RadioInput>
            <RadioInput
              {...inputProps("kidsWelcome", {
                value: false,
                checked: !form.kidsWelcome,
              })}
            >
              No
            </RadioInput>
          </div>
        </div>

        <div>
          <p>Are pets welcome?</p>
          <div className="radio-container">
            <RadioInput
              {...inputProps("petsWelcome", {
                value: true,
                checked: form.petsWelcome,
              })}
            >
              Yes
            </RadioInput>
            <RadioInput
              {...inputProps("petsWelcome", {
                value: false,
                checked: !form.petsWelcome,
              })}
            >
              No
            </RadioInput>
          </div>
        </div>

        <div>
          <p>Do you have space outside (balcony, terrace, garden)?</p>
          <div className="radio-container">
            <RadioInput
              {...inputProps("spaceOutside", {
                value: true,
                checked: form.spaceOutside,
              })}
            >
              Yes
            </RadioInput>
            <RadioInput
              {...inputProps("spaceOutside", {
                value: false,
                checked: !form.spaceOutside,
              })}
            >
              No
            </RadioInput>
          </div>
        </div>

        <div>
          <p>General description</p>
          <p>
            Please tell us a bit more about your place and your flatmates (if
            you have any).
          </p>
          <textarea
            {...inputProps("generalDescription", { type: "textarea" })}
            value={generalDescription}
            className="textarea"
          />
        </div>

        <div>
          {/* we should make it interactive labels instead of checkmarks! :D */}
          <p>What describes your neighborhood best?</p>
          <div className="checkbox-container">
            {AMENITIES.AMBIENCE.map((item, index) => (
              <CheckboxInput
                key={index}
                {...inputProps("ambienceLabels", { item })}
              />
            ))}
          </div>
        </div>

        <div>
          <p>What else shall we know about your place?</p>
          <p>Let other users know about the coolest places in the hood!</p>
          <textarea
            {...inputProps("extraRemarks", { type: "textarea" })}
            placeholder={extraRemarks}
            className="textarea"
          />
        </div>

        <div>
          <p>Add images</p>
          <input type="file" onChange={handleImageChange} />
        </div>

        <div>
          <p>Is the place available now?</p>
          <div className="radio-container">
            <RadioInput
              {...inputProps("availability", {
                value: true,
                checked: form.availability,
              })}
            >
              Yes
            </RadioInput>
            <RadioInput
              {...inputProps("availability", {
                value: false,
                checked: !form.availability,
              })}
            >
              No
            </RadioInput>
          </div>
        </div>
        <button>Save changes</button>
      </form>
    </div>
  );

  function CheckboxInput(props) {
    const { item, name, handleChange, checked } = props;
    return (
      <div>
        <input
          type="checkbox"
          className="checkbox"
          id={item}
          name={name}
          value={item}
          onChange={handleChange}
          checked={checked}
        />
        <label>{item}</label>
      </div>
    );
  }

  function RadioInput(props) {
    const { children, name, handleChange, checked, value } = props;
    return (
      <div>
        <input
          type="radio"
          className="radio"
          id={children}
          name={name}
          onChange={handleChange}
          checked={checked}
          value={value}
        />
        <label>{children}</label>
      </div>
    );
  }
}
