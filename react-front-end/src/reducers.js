import {
  URL_CHANGED,
  ROUTE_CHANGED,
  SIGNING_IN,
  SIGN_IN_EMAIL_CHANGED,
  SIGN_IN_PASSWORD_CHANGED,
  CALCULATING_FACES_PENDING,
  CALCULATING_FACES_SUCCESS,
  CALCULATING_FACES_FAILED
} from "./constants.js";

const initialSignInDetails = {
  signInEmail: "",
  signInPassword: "",
  route: "signin",
  isSignedIn: false
};

export const signInDetails = (state = initialSignInDetails, action = {}) => {
  switch (action.type) {
    case SIGNING_IN:
      return Object.assign({}, state, {
        signInEmail: action.payload_email,
        signInPassword: action.payload_password,
        route: "home",
        isSignedIn: true
      });
    case SIGN_IN_EMAIL_CHANGED:
      return Object.assign({}, state, {
        signInEmail: action.payload
      });
    case SIGN_IN_PASSWORD_CHANGED:
      return Object.assign({}, state, {
        signInPassword: action.payload
      });
    default:
      return state;
  }
};

const initialRoute = {
  route: "signin",
  isSignedIn: false
};

export const router = (state = initialRoute, action = {}) => {
  switch (action.type) {
    case ROUTE_CHANGED:
      const signInCheck = action.payload === "home" ? true : false;

      return Object.assign({}, state, {
        route: action.payload,
        isSignedIn: signInCheck
      });

    default:
      return state;
  }
};

const initialUrlField = {
  input: "",
  imageUrl: ""
};

export const urlField = (state = initialUrlField, action = {}) => {
  switch (action.type) {
    case URL_CHANGED:
      return Object.assign({}, state, {
        input: action.payload,
        imageUrl: action.payload
      });

    default:
      return state;
  }
};

const initialImageBox = {
  box: [{}],
  isPending: false,
  error: ""
};

export const faceBoxes = (state = initialImageBox, action = {}) => {
  switch (action.type) {
    case CALCULATING_FACES_PENDING:
      return Object.assign({}, state, { isPending: true });

    case CALCULATING_FACES_SUCCESS:
      return Object.assign({}, state, {
        box: action.payload,
        isPending: false
      });

    case CALCULATING_FACES_FAILED:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: false
      });

    default:
      return state;
  }
};
