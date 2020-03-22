import {
  URL_CHANGED,
  ROUTE_CHANGED,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  SIGNING_OUT,
  SIGN_IN_EMAIL_CHANGED,
  SIGN_IN_PASSWORD_CHANGED,
  CLEAR_SIGN_IN_FIELD,
  REGISTER_FNAME_CHANGED,
  REGISTER_LNAME_CHANGED,
  REGISTER_EMAIL_CHANGED,
  CLEAR_REGISTER_FIELD,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  REGISTER_PASSWORD_CHANGED,
  REGISTER_CONFIRM_PASS_CHANGED,
  CALCULATING_FACES_PENDING,
  CALCULATING_FACES_SUCCESS,
  CALCULATING_FACES_FAILED,
  NO_FACES_DETECTED,
  UPDATE_ENTRIES,
  RESET_URL,
  RESET_FACE_BOXES,
  CLEAR_SIGN_IN_ERROR,
  CLEAR_REGISTER_ERROR,
  SIGN_IN_PENDING,
  REGISTER_PENDING
} from "./constants.js";

const initialRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPass: "",
  firstNameActivated: false,
  lastNameActivated: false,
  emailActivated: false,
  passwordActivated: false,
  confirmPassActivated: false
};

export const register = (state = initialRegister, action = {}) => {
  switch (action.type) {
    case REGISTER_FNAME_CHANGED:
      return Object.assign({}, state, {
        firstName: action.payload,
        firstNameActivated: true
      });
    case REGISTER_LNAME_CHANGED:
      return Object.assign({}, state, {
        lastName: action.payload,
        lastNameActivated: true
      });
    case REGISTER_EMAIL_CHANGED:
      return Object.assign({}, state, {
        email: action.payload,
        emailActivated: true
      });
    case REGISTER_PASSWORD_CHANGED:
      return Object.assign({}, state, {
        password: action.payload,
        passwordActivated: true
      });

    case REGISTER_CONFIRM_PASS_CHANGED:
      return Object.assign({}, state, {
        confirmPass: action.payload,
        confirmPassActivated: true
      });

    case CLEAR_REGISTER_FIELD:
      return Object.assign({}, state, initialRegister);
    default:
      return state;
  }
};

const initialSignIn = {
  email: "",
  password: "",
  emailActivated: false,
  passwordActivated: false,
};

export const signIn = (state = initialSignIn, action = {}) => {
  switch (action.type) {
    case SIGN_IN_EMAIL_CHANGED:
      return Object.assign({}, state, {
        email: action.payload,
        emailActivated: true
      });
    case SIGN_IN_PASSWORD_CHANGED:
      return Object.assign({}, state, {
        password: action.payload,
        passwordActivated: true
      });
    case CLEAR_SIGN_IN_FIELD:
      return Object.assign({}, state, initialSignIn);
    default:
      return state;
  }
};

const initialState = {
  route: "signin",
  isSignedIn: false,
  signInFailed: "",
  registerFailed: "",
  userProfile: {},
  signInPending: false,
  registerPending: false
};

export const userDefaults = (state = initialState, action = {}) => {
  switch (action.type) {
    case ROUTE_CHANGED:
      return Object.assign({}, state, {
        route: action.payload
      });

    case CLEAR_SIGN_IN_ERROR:
      return Object.assign({}, state, {
        signInFailed: ""
      });

    case CLEAR_REGISTER_ERROR:
      return Object.assign({}, state, {
        registerFailed: ""
      });

    case SIGNING_OUT:
      return Object.assign({}, state, initialState);

    case SIGN_IN_SUCCESS:
      return Object.assign({}, state, {
        signInFailed: "",
        registerFailed: "",
        signInPending: false,
        registerPending: false,
        isSignedIn: true,
        route: action.payload,
        userProfile: action.userData
      });

    case SIGN_IN_PENDING:
      return Object.assign({}, state, {
        signInPending: true,
        signInFailed: ""
      });

    case SIGN_IN_FAILED:
      return Object.assign({}, state, {
        signInFailed: action.payload,
        signInPending: false,
      });

    case REGISTER_PENDING:
      return Object.assign({}, state, {
        registerFailed: "",
        registerPending: true
      });

    case REGISTER_SUCCESS:
      return Object.assign({}, state, {
        isSignedIn: true,
        route: action.payload,
        signInFailed: "",
        registerFailed: "",
        registerPending: false,
        userProfile: action.userData
      });

    case REGISTER_FAILED:
      return Object.assign({}, state, {
        registerFailed: action.payload,
        registerPending: false
      });

    case UPDATE_ENTRIES:
      // make sure we dont overwrite existing userProfile object
      return Object.assign({}, state, {
        userProfile: {
          ...state.userProfile,
          entries: action.payload
        }
      });

    default:
      return state;
  }
};

const initialUrlField = {
  imageUrl: ""
};

export const urlField = (state = initialUrlField, action = {}) => {
  switch (action.type) {
    case RESET_URL:
      return Object.assign({}, state, initialUrlField);

    case URL_CHANGED:
      return Object.assign({}, state, {
        imageUrl: action.payload
      });

    default:
      return state;
  }
};

const initialImageBox = {
  submittedUrl: "",
  box: [{}],
  isPending: false,
  error: "",
  faceDetected: -1
};

export const faceBoxes = (state = initialImageBox, action = {}) => {
  switch (action.type) {
    case RESET_FACE_BOXES:
      return Object.assign({}, state, initialImageBox);

    case CALCULATING_FACES_PENDING:
      return Object.assign({}, state, {
        isPending: true,
        submittedUrl: action.payload,
        error: ""
      });

    case CALCULATING_FACES_SUCCESS:
      return Object.assign({}, state, {
        box: action.payload,
        isPending: false,
        faceDetected: action.payload.length
      });

    case CALCULATING_FACES_FAILED:
      return Object.assign({}, state, {
        error: action.payload,
        box: [{}],
        isPending: false
      });

    case NO_FACES_DETECTED:
      return Object.assign({}, state, {
        isPending: false,
        faceDetected: 0
      });

    default:
      return state;
  }
};
