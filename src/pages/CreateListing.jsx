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
    kitchenEquipment: "",
    bathroomEquipment: "",
    workSetup: "",
    accessability: "",
    forSmokers: "",
    kidsWelcome: "",
    petsWelcome: "",
    spaceOutside: "",
    extraRemarks: "",
    ambienceDescription: "",
    imagesGallery: "",
    availability: "",
  });

  const [error, setError] = React.useState(null);

  const onSubmit = handleSubmit((formValues) => {
    LISTING_SERVICE.CREATE_LISTING(formValues).then((response) => {
      if (!response.status) {
        setError(response);
        return;
      }
      props.authenticate(response.data.user);
      localStorage.setItem(CONSTS.ACCESS_TOKEN, response.data.accessToken);
      props.history.push(PATHS.SINGLE_LISTING);
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
          <label>Kitchen equipment (to be fixed: checkbox)</label>
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
          <label>Is smoking allowed? (to be fixed: toggle yes/no)</label>
        </div>

        <div>
          <label>Are kids welcome? (to be fixed: toggle yes/no)</label>
        </div>

        <div>
          <label>Are pets welcome? (to be fixed: toggle yes/no)</label>
        </div>

        <div>
          <label>
            Is there any space outside? (to be fixed: toggle yes/no)
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
          <label>Is is available now? (to be fixed: toggle yes/no)</label>
        </div>

        <button>Submit the listing!</button>
      </form>
    </div>
  );
}
