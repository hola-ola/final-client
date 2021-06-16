import axios from "axios";
import * as CONSTS from "../utils/consts";

const reviewService = axios.create({
  baseURL: `${CONSTS.SERVER_URL}/reviews`,
});

export function ADD_REVIEW(username, form, token) {
  console.log(form);
  return reviewService
    .post(`/${username}/add`, form, {
      headers: {
        authorization: token,
      },
    })
    .then((response) => {
      console.log("Data from the server:", response.data);
      return response.data;
    })
    .catch((err) => {
      console.error(err.response);
    });
}

export function RECEIVED_REVIEWS(username, token) {
  console.log("Are we requesting the reviews?");
  return reviewService
    .get(`/${username}/received-reviews`, {
      headers: {
        authorization: token,
      },
    })
    .then((response) => {
      console.log("Data from the server:", response.data);
      return response.data;
    })
    .catch((err) => {
      console.error(err.response);
    });
}

export function GIVEN_REVIEWS(username, token) {
  console.log("Are we requesting the reviews?");
  return reviewService
    .get(`/${username}/given-reviews`, {
      headers: {
        authorization: token,
      },
    })
    .then((response) => {
      console.log("Data from the server:", response.data);
      return response.data;
    })
    .catch((err) => {
      console.error(err.response);
    });
}
