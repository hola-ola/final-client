import React from "react";
import * as LISTING_SERVICE from "../services/listing.service";
import * as CONSTS from "../utils/consts";
import * as PATHS from "../utils/paths";
import * as AMENITIES from "../utils/amenities";
import useForm from "../hooks/useForm";

import "./CreateListing.css";

export default function CreateListing(props) {
  const [form, handleChange, handleSubmit, inputProps] = useForm({
    title: "",
    owner: "",
    country: "",
    city: "",
    lengthOfStay: [],
    type: "Flat",
    numberOfSleepingSpots: "",
    generalDescription: "",
    kitchenEquipment: [],
    bathroomEquipment: [],
    workSetup: [],
    accessibility: [],
    smokersWelcome: true,
    kidsWelcome: true,
    petsWelcome: true,
    spaceOutside: true,
    extraRemarks: "",
    ambienceLabels: [],
    imagesGallery: "",
    availability: true,
  });

  const [error, setError] = React.useState(null);

  const onSubmit = handleSubmit((formValues) => {
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    const userId = props.user._id;

    // return console.log(formValues);

    LISTING_SERVICE.CREATE_LISTING({ formValues, userId }, accessToken)
      .then((response) => {
        console.log("This is the response: ", response);
        props.history.push(PATHS.HOMEPAGE);
      })
      .catch((err) => {
        console.error("This is the error: ", err.response);
      });
  });

  return (
    <div className="create-listing-wrapper">
      <h1>Add your listing here</h1>
      <form onSubmit={onSubmit}>
        <div>
          <p>Title</p>
          <input {...inputProps("title")} />
          {error?.key === "title" && (
            <p className="errorMessage">{error.message}</p>
          )}
        </div>

        <div>
          <p>Country</p>
          <input {...inputProps("country")} />
        </div>

        <div>
          <p>City</p>
          <input {...inputProps("city")} />
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
          <p>General description</p>
          <input {...inputProps("generalDescription", { type: "textarea" })} />
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
          {/* we should make it interactive labels instead of checkmarks! :D */}
          <p>What describes your place best?</p>
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
          <input {...inputProps("extraRemarks", { type: "textarea" })} />
        </div>

        <div>
          <p>Add images (to be fixed: multiple images possible)</p>
          <input
            type="text"
            name="imagesGallery"
            onChange={handleChange}
            value={form.imagesGallery}
          />
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
        <button>Submit the listing!</button>
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