import React from "react";
import * as LISTING_SERVICE from "../services/listing.service";
import * as CONSTS from "../utils/consts";
import * as PATHS from "../utils/paths";
import * as AMENITIES from "../utils/amenities";
import useForm from "../hooks/useForm";

import "./CreateListing.css";

export default function CreateListing(props) {
  const [form, handleChange, handleSubmit] = useForm({
    title: "",
    owner: "",
    country: "",
    city: "",
    lengthOfStay: [],
    type: "",
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
    ambienceDescription: "",
    imagesGallery: "",
    availability: true,
  });

  const [error, setError] = React.useState(null);

  const onSubmit = handleSubmit((formValues) => {
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    const userId = props.user._id;

    return console.log(formValues);

    LISTING_SERVICE.CREATE_LISTING({ formValues, userId }, accessToken)
      .then((response) => {
        console.log("This is the response: ", response);
        props.history.push(PATHS.HOMEPAGE);
      })
      .catch((err) => {
        console.error("This is the error: ", err.response);
      });
  });

  const style = {
    textAlign: "left",
    marginLeft: "20vw",
    lineHeight: "30px",
  };

  return (
    <div className="create-listing-wrapper">
      <h1>Add your listing here</h1>
      <form onSubmit={onSubmit}>
        <div>
          <p>Title</p>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            value={form.title}
          />
          {error?.key === "title" && (
            <p className="errorMessage">{error.message}</p>
          )}
        </div>

        <div>
          <p>Country</p>
          <input
            type="text"
            name="country"
            onChange={handleChange}
            value={form.country}
          />
        </div>

        <div>
          <p>City</p>
          <input
            type="text"
            name="city"
            onChange={handleChange}
            value={form.city}
          />
        </div>

        <div>
          <p>Possible length of stay</p>
          <div className="checkbox-container">
            {AMENITIES.LENGTH_OF_STAY.map((item, index) => (
              <CheckboxInput
                item={item}
                key={index}
                name="lengthOfStay"
                handleChange={handleChange}
                checked={form.lengthOfStay.includes(item)}
              />
            ))}
          </div>
        </div>

        <div>
          <p>Type</p>
          <div className="radio-container">
            {AMENITIES.LISTING_TYPE.map((item, index) => (
              <RadioInput
                key={index}
                name="type"
                handleChange={handleChange}
                checked={!form.type ? item[0] : item[index]}
                value={item}
              >
                {item}
              </RadioInput>
            ))}
          </div>
        </div>

        <div>
          <p>Number of sleeping spots</p>
          <input
            type="number"
            name="numberOfSleepingSpots"
            onChange={handleChange}
            value={form.numberOfSleepingSpots}
          />
        </div>

        <div>
          <p>General description</p>
          <input
            type="textarea"
            name="generalDescription"
            onChange={handleChange}
            value={form.generalDescription}
          />
        </div>

        <div>
          <p>Kitchen equipment</p>
          <div className="checkbox-container">
            {AMENITIES.KITCHEN_EQUIPMENT.map((item, index) => (
              <CheckboxInput
                item={item}
                key={index}
                name="kitchenEquipment"
                handleChange={handleChange}
                checked={form.kitchenEquipment.includes(item)}
              />
            ))}
          </div>
        </div>

        <div>
          <p>Bathroom equipment</p>
          <div className="checkbox-container">
            {AMENITIES.BATHROOM_EQUIPMENT.map((item, index) => (
              <CheckboxInput
                item={item}
                key={index}
                name="bathroomEquipment"
                handleChange={handleChange}
                checked={form.bathroomEquipment.includes(item)}
              />
            ))}
          </div>
        </div>

        <div>
          <p>Work setup</p>
          <div className="checkbox-container">
            {AMENITIES.WORK_SETUP.map((item, index) => (
              <CheckboxInput
                item={item}
                key={index}
                name="workSetup"
                handleChange={handleChange}
                checked={form.workSetup.includes(item)}
              />
            ))}
          </div>
        </div>

        <div>
          <p>Accessibility</p>
          <div className="checkbox-container">
            {AMENITIES.ACCESSIBILITY.map((item, index) => (
              <CheckboxInput
                item={item}
                key={index}
                name="accessibility"
                handleChange={handleChange}
                checked={form.accessibility.includes(item)}
              />
            ))}
          </div>
        </div>

        <div>
          <p>Is smoking allowed?</p>
          <div className="radio-container">
            <RadioInput
              name="smokersWelcome"
              handleChange={handleChange}
              checked={form.smokersWelcome}
              value={true}
            >
              Yes
            </RadioInput>
            <RadioInput
              name="smokersWelcome"
              handleChange={handleChange}
              checked={!form.smokersWelcome}
              value={false}
            >
              No
            </RadioInput>
          </div>
        </div>

        <div>
          <p>Are kids welcome?</p>
          <div className="radio-container">
            <RadioInput
              name="kidsWelcome"
              handleChange={handleChange}
              checked={form.kidsWelcome}
              value={true}
            >
              Yes
            </RadioInput>
            <RadioInput
              name="kidsWelcome"
              handleChange={handleChange}
              checked={!form.kidsWelcome}
              value={false}
            >
              No
            </RadioInput>
          </div>
        </div>

        <div>
          <p>Are pets welcome?</p>
          <div className="radio-container">
            <RadioInput
              name="petsWelcome"
              handleChange={handleChange}
              checked={form.petsWelcome}
              value={true}
            >
              Yes
            </RadioInput>
            <RadioInput
              name="petsWelcome"
              handleChange={handleChange}
              checked={!form.petsWelcome}
              value={false}
            >
              No
            </RadioInput>
          </div>
        </div>

        <div>
          <p>Do you have space outside (balcony, terrace, garden)?</p>
          <div className="radio-container">
            <RadioInput
              name="spaceOutside"
              handleChange={handleChange}
              checked={form.spaceOutside}
              value={true}
            >
              Yes
            </RadioInput>
            <RadioInput
              name="spaceOutside"
              handleChange={handleChange}
              checked={!form.spaceOutside}
              value={false}
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
                item={item}
                key={index}
                name="ambienceLabels"
                handleChange={handleChange}
                checked={form.ambienceLabels.includes(item)}
              />
            ))}
          </div>
        </div>

        <div>
          <p>What else shall we know about your place?</p>
          <input
            type="textarea"
            name="extraRemarks"
            onChange={handleChange}
            value={form.extraRemarks}
          />
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
              name="availability"
              handleChange={handleChange}
              checked={form.availability}
              value={true}
            >
              Yes
            </RadioInput>
            <RadioInput
              name="availability"
              handleChange={handleChange}
              checked={!form.availability}
              value={false}
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
          onClick={handleChange}
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

// WORKED WITH ANDRE
// {
/* <div>
<p>Is smoking allowed?</p>

<label>
  <input
    type="radio"
    id="smokersWelcomeYes"
    name="smokersWelcome"
    className="radio"
    onChange={handleChange}
    checked={form.smokersWelcome}
    value={true}
  />
  Yes
  <input
    type="radio"
    id="smokersWelcomeNo"
    name="smokersWelcome"
    className="radio"
    onChange={handleChange}
    checked={!form.smokersWelcome}
    value={false}
  />
  No
</label>
</div> */
// }
