import axios from "axios";
import * as CONSTS from "../utils/consts";

const listingService = axios.create({
  baseURL: `${CONSTS.SERVER_URL}/listings`,
});

export function CREATE_LISTING(body, token) {
  return listingService
    .post("/create", body, {
      headers: {
        authorization: token,
      },
    })
    .then((res) => {
      console.log("data from server: ", res.data);
      return res.data;
    })
    .catch((err) => console.log(err.response));
}

export function VIEW_LISTING(listingId, token) {
  return listingService
    .get(`/${listingId}`, {
      headers: {
        authorization: token,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err.response));
}
