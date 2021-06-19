export const HOMEPAGE = "/";
export const PROTECTEDPAGE = "/protected";

export const SIGNUPPAGE = "/auth/signup";
export const LOGINPAGE = "/auth/login";

export const USER = "/user";
export const USERPAGE = `${USER}/:username`;
export const USER_EDIT = `${USERPAGE}/edit`;
export const USER_REVIEWS = `${USERPAGE}/reviews`;

export const LISTINGS = "/listings";
export const CREATE_LISTING = `${LISTINGS}/create`;
export const SINGLE_LISTING = `${LISTINGS}/:listingId`;
export const EDIT_LISTING = `${LISTINGS}/:listingId/edit`;
export const DELETE_LISTING = `${LISTINGS}/:listingId/delete`;
export const LISTING_REMOVED = `${LISTINGS}/:listingId/removed`;

export const RESULTS = "/results";
export const SEARCH_RESULTS = `${RESULTS}/search`;

export const MESSAGES = "/messages";
export const NEW_MESSAGE = `/${MESSAGES}/new`;
