import axios from "axios";
import * as CONSTS from "../utils/consts";

const messageService = axios.create({
  baseURL: `${CONSTS.SERVER_URL}/messages`,
});

export function SHOW_CONVERSATIONS(token) {
  return messageService
    .get("/", {
      headers: { authorization: token },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err.response));
}

export function NEW_CONVERSATION(token) {
  return messageService
    .get("/new", {
      headers: { authorization: token },
    })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => console.log(err.response));
}
