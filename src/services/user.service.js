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
  return userService.put("/update", body, {
    headers: {
      authorization: token,
    },
  });
}

// GET user wishlist
export function GET_WISHLIST(username, token) {
  return userService.get(`/${username}/wishlist`, {
    headers: {
      authorization: token,
    },
  });
}

// DELETE user wishlist
export function WISHLIST_DELETE(username, listingId, token) {
  return userService.get(`/${username}/wishlist/delete`, {
    headers: {
      authorization: token,
    },
  });
}
