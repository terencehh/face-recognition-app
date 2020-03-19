import {
  URL_CHANGED,
  ROUTE_CHANGED,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  SIGNING_OUT,
  SIGN_IN_EMAIL_CHANGED,
  SIGN_IN_PASSWORD_CHANGED,
  REGISTER_NAME_CHANGED,
  REGISTER_EMAIL_CHANGED,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  REGISTER_PASSWORD_CHANGED,
  CALCULATING_FACES_PENDING,
  CALCULATING_FACES_SUCCESS,
  CALCULATING_FACES_FAILED
} from "./constants.js";

const initialRegister = {
  name: "",
  email: "",
  password: ""
};

export const register = (state = initialRegister, action = {}) => {
  switch (action.type) {
    case REGISTER_NAME_CHANGED:
      return Object.assign({}, state, {
        name: action.payload
      });
    case REGISTER_EMAIL_CHANGED:
      return Object.assign({}, state, {
        email: action.payload
      });
    case REGISTER_PASSWORD_CHANGED:
      return Object.assign({}, state, {
        password: action.payload
      });
    default:
      return state;
  }
};

const initialSignIn = {
  email: "",
  password: ""
};

export const signIn = (state = initialSignIn, action = {}) => {
  switch (action.type) {
    case SIGN_IN_EMAIL_CHANGED:
      return Object.assign({}, state, {
        email: action.payload
      });
    case SIGN_IN_PASSWORD_CHANGED:
      return Object.assign({}, state, {
        password: action.payload
      });
    default:
      return state;
  }
};

const initialState = {
  route: "signin",
  isSignedIn: false,
  signInFailed: false,
  registerFailed: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: new Date()
  }
};

export const userDefaults = (state = initialState, action = {}) => {
  switch (action.type) {
    case ROUTE_CHANGED:
      return Object.assign({}, state, {
        route: action.payload
      });

    case SIGNING_OUT:
      return Object.assign({}, state, {
        route: action.payload,
        isSignedIn: false,
        user: initialState.user
      });

    case SIGN_IN_SUCCESS:
      return Object.assign({}, state, {
        isSignedIn: true,
        route: action.payload,
        user: {
          id: action.userData.id,
          name: action.userData.name,
          email: action.userData.email,
          entries: action.userData.entries,
          joined: action.userData.joined
        }
      });

    case SIGN_IN_FAILED:
      return Object.assign({}, state, {
        signInFailed: true
      });

    case REGISTER_SUCCESS:
      return Object.assign({}, state, {
        isSignedIn: true,
        route: action.payload,
        user: {
          id: action.userData.id,
          name: action.userData.name,
          email: action.userData.email,
          entries: action.userData.entries,
          joined: action.userData.joined
        }
      });

    case REGISTER_FAILED:
      return Object.assign({}, state, {
        registerFailed: true
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
