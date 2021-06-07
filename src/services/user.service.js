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
      console.log("data from server: ", response.data);
    })
    .catch((err) => console.log(err));
}
