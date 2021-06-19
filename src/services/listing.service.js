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

export function EDIT_LISTING(listingId, token) {
  return listingService
    .get(`/${listingId}/edit`, {
      headers: { authorization: token },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err.response);
      if (err?.response?.status === 403) {
        return false;
      }
    });
}

export function EDITED_LISTING(body, listingId, token) {
  return listingService
    .put(`/${listingId}/edit`, body, {
      headers: { authorization: token },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err.response));
}

export function DELETE_LISTING(listingId, token) {
  return listingService
    .get(`/${listingId}/delete`, {
      headers: {
        authorization: token,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err.response);
      if (err?.response?.status === 403) {
        return false;
      }
    });
}

export function REMOVE_LISTING(listingId, token) {
  return listingService
    .get(`/${listingId}/removed`, {
      headers: {
        authorization: token,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((err) => console.log(err.response));
}

export function VIEW_USER_LISTING(username, token) {
  return listingService
    .get(`/${username}/listing`, {
      headers: {
        authorization: token,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err.response));
}
