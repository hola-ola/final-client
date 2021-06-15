import axios from "axios";
import { useState } from "react";
import * as CONSTS from "../utils/consts";

export default function useSingleImage(formBody) {
  const [form, setForm] = useState(formBody);
  const [singleImage, setSingleImage] = useState("");

  function SingleImageChange(event) {
    const { target } = event;
    setForm({ [event.name]: event.value });
  }

  function SingleImageSubmit(event, singleImage) {
    event.preventDefault();
    console.log("Started to handle single image submit");
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/image`, singleImage, {
        headers: {
          authorization: localStorage.getItem(CONSTS.ACCESS_TOKEN),
        },
      })
      .then((response) => {
        console.log("This is updated user picture:", response.data.picture);
        setSingleImage(response.data.picture);
      })
      .catch((err) => {
        console.error(err.response);
      });
  }

  return [form, singleImage, SingleImageChange, SingleImageSubmit];
}
