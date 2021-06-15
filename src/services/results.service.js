import axios from "axios";
import * as CONSTS from "../utils/consts";

const searchService = axios.create({ baseURL: `${CONSTS.SERVER_URL}/results` });

export function SEARCH_LISTINGS(token) {
  return searchService
    .get("/search", {
      headers: { authorization: token },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err.response));
}
