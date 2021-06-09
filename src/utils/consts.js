export const ACCESS_TOKEN = "access_token";
const APP_NAME = "Hop Flat Swop";
export const CAPITALIZED_APP = APP_NAME.toUpperCase();

const URL = process.env.REACT_APP_SERVER_URL;

export const SERVER_URL = URL ? `${URL}` : `http://localhost:5005/api`;
