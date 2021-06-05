import React from "react";
import * as LISTING_SERVICE from "../services/listing.service";
import * as CONSTS from "../utils/consts";
import * as PATHS from "../utils/paths";
import useForm from "../hooks/useForm";

export default function CreateListing(props) {
  const [form, handleChange, handleSubmit] = useForm({
    title: "",
    owner: "",
    country: "",
    city: "",
    lengthOfStay: "",
    type: "",
    numberOfSleepingSpots: "",
    generalDescription: "",
    kitchenEquipment: [],
    bathroomEquipment: [],
    workSetup: [],
    accessability: [],
    smokersWelcome: true,
    kidsWelcome: true,
    petsWelcome: true,
    spaceOutside: true,
    extraRemarks: "",
    ambienceDescription: "",
    imagesGallery: "",
    availability: true,
  });

  const [error, setError] = React.useState(null);

  const onSubmit = handleSubmit((formValues) => {
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    const userId = props.user._id;

    return console.log("This is kitchen equipment: ", form.kitchenEquipment);

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
    <div style={style}>
      <h1>Add your listing here</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Title</label>
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
          <label>Country</label>
          <input
            type="text"
            name="country"
            onChange={handleChange}
            value={form.country}
          />
        </div>

        <div>
          <label>City</label>
          <input
            type="text"
            name="city"
            onChange={handleChange}
            value={form.city}
          />
        </div>

        <div>
          <label>Length of stay (to be fixed: ENUM case)</label>
        </div>

        <div>
          <label>Type (to be fixed: ENUM case)</label>
        </div>

        <div>
          <label>Number Of Sleeping Spots</label>
          <input
            type="number"
            name="numberOfSleepingSpots"
            onChange={handleChange}
            value={form.numberOfSleepingSpots}
          />
        </div>

        <div>
          <label>General description</label>
          <input
            type="textarea"
            name="generalDescription"
            onChange={handleChange}
            value={form.generalDescription}
          />
        </div>

        <div>
          <p>Kitchen equipment</p>

          <label>
            <input
              type="checkbox"
              id="kitchenEquipmentOven"
              name="kitchenEquipment"
              className="checkbox"
              onChange={handleChange}
              value="oven"
              checked={form.kitchenEquipment.includes("oven")}
            />
            Oven
            <input
              type="checkbox"
              id="kitchenEquipmentBlender"
              name="kitchenEquipment"
              className="checkbox"
              onChange={handleChange}
              value="blender"
              checked={form.kitchenEquipment.includes("blender")}
            />
            Blender
          </label>
        </div>

        <div>
          <label>Bathroom equipment (to be fixed: checkbox)</label>
        </div>

        <div>
          <label>Work setup (to be fixed: checkbox)</label>
        </div>

        <div>
          <label>Accessability (to be fixed: checkbox)</label>
        </div>

        <div>
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
        </div>

        <div>
          <p>Are kids welcome?</p>

          <label>
            <input
              type="radio"
              id="kidsWelcomeYes"
              name="kidsWelcome"
              className="radio"
              onChange={handleChange}
              checked={form.kidsWelcome}
              value={true}
            />
            Yes
            <input
              type="radio"
              id="kidsWelcomeNo"
              name="kidsWelcome"
              className="radio"
              onChange={handleChange}
              checked={!form.kidsWelcome}
              value={false}
            />
            No
          </label>
        </div>
        <div>
          <p>Are pets welcome?</p>

          <label>
            <input
              type="radio"
              id="petsWelcomeYes"
              name="petsWelcome"
              className="radio"
              onChange={handleChange}
              checked={form.petsWelcome}
              value={true}
            />
            Yes
            <input
              type="radio"
              id="petsWelcomeNo"
              name="petsWelcome"
              className="radio"
              onChange={handleChange}
              checked={!form.petsWelcome}
              value={false}
            />
            No
          </label>
        </div>

        <div>
          <p>Is there outside space available?</p>

          <label>
            <input
              type="radio"
              id="spaceOutsideYes"
              name="spaceOutside"
              className="radio"
              onChange={handleChange}
              checked={form.spaceOutside}
              value={true}
            />
            Yes
            <input
              type="radio"
              id="spaceOutsideNo"
              name="spaceOutside"
              className="radio"
              onChange={handleChange}
              checked={!form.spaceOutside}
              value={false}
            />
            No
          </label>
        </div>

        <div>
          <label>Extra remarks</label>
          <input
            type="textarea"
            name="extraRemarks"
            onChange={handleChange}
            value={form.extraRemarks}
          />
        </div>

        <div>
          <label>Ambience description</label>
          <input
            type="textarea"
            name="ambienceDescription"
            onChange={handleChange}
            value={form.ambienceDescription}
          />
        </div>

        <div>
          <label>Add images (to be fixed: multiple images possible)</label>
          <input
            type="text"
            name="imagesGallery"
            onChange={handleChange}
            value={form.imagesGallery}
          />
        </div>

        <div>
          <p>Is the place available now?</p>

          <label>
            <input
              type="radio"
              id="availabilityYes"
              name="availability"
              className="radio"
              onChange={handleChange}
              checked={form.availability}
              value={true}
            />
            Yes
            <input
              type="radio"
              id="availabilityNo"
              name="availability"
              className="radio"
              onChange={handleChange}
              checked={!form.availability}
              value={false}
            />
            No
          </label>
        </div>

        <button>Submit the listing!</button>
      </form>
    </div>
  );
}
