import axios from "axios";
import * as CONSTS from "../utils/consts";

const userService = axios.create({
  baseURL: `${CONSTS.SERVER_URL}/user`,
});

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

export function USER_UPDATE(username, token) {
  return userService
    .get(`/${username}/update`, {
      headers: {
        authorization: token,
      },
    })
    .then((response) => {
      console.log("Data from the server: ", response.data);
    });
}
