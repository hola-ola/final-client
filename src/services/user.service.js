import axios from "axios";
import * as CONSTS from "../utils/consts";

const userService = axios.create({
  baseURL: `${CONSTS.SERVER_URL}/user`,
});

// GET user data
export function GET_USER(username, token) {
  return userService
    .get(`/${username}`, {
      headers: {
        authorization: token,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((err) => console.log(err));
}

// DELETE user
export function USER_DELETE(username, token) {
  return userService
    .get(`/${username}/delete`, {
      headers: {
        authorization: token,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((err) => console.log(err));
}

// UPDATE user
export function UPDATE_USER(body, token) {
  return userService
    .put("/update", body, {
      headers: {
        authorization: token,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((err) => console.log(err));
}

// GET user wishlist
export function GET_WISHLIST(username, token) {
  return userService
    .get(`/${username}/wishlist`, {
      headers: {
        authorization: token,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((err) => console.log(err));
}

// DELETE from user wishlist
export function WISHLIST_DELETE(listingId, username, token) {
  // console.log("Remove from wishlist - step 2");
  // console.log("username: ", username);
  // console.log("listingId: ", listingId);
  // console.log("token: ", token);
  return userService
    .put(
      `/${username}/wishlist-delete`,
      { listingId },
      {
        headers: {
          authorization: token,
        },
      }
    )
    .then((response) => {
      // console.log("Remove from wishlist - step 3");
      return response;
    })
    .catch((err) => console.log(err.response));
}
