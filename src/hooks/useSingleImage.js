import axios from "axios";
import { useState } from "react";
import * as CONSTS from "../utils/consts";

function submitImage(formBody) {
  return axios
    .post(`${process.env.REACT_APP_SERVER_URL}/image`, formBody, {
      headers: {
        authorization: localStorage.getItem(CONSTS.ACCESS_TOKEN),
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err.response);
      return {};
    });
}

export default function useSingleImage(formBody, authenticate) {
  const [form, setForm] = useState(formBody);
  const [singleImage, setSingleImage] = useState("");
  // console.log("HERE: ", singleImage);
  function SingleImageChange(event) {
    const { target } = event;
    const file = target.files[0];
    const formBody = new FormData();
    formBody.append("image", file);
    submitImage(formBody).then((response) => {
      setSingleImage(response.picture);
    });
  }

  function SingleImageSubmit(event) {
    event.preventDefault();
    // console.log("Started to handle single image submit");
    axios
      .put(
        `${process.env.REACT_APP_SERVER_URL}/user/update-img`,
        { singleImage },
        {
          headers: {
            authorization: localStorage.getItem(CONSTS.ACCESS_TOKEN),
          },
        }
      )
      .then((response) => {
        // console.log("This is updated user picture:", response.data);
        authenticate(response.data.user);
      })
      .catch((err) => {
        console.error(err.response);
      });
  }

  return {
    form,
    singleImage,
    SingleImageChange,
    SingleImageSubmit,
  };
}
