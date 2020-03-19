import {
  URL_CHANGED,
  CALCULATING_FACES_PENDING,
  CALCULATING_FACES_SUCCESS,
  CALCULATING_FACES_FAILED,
  ROUTE_CHANGED,
  SIGNING_OUT,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  SIGN_IN_PENDING,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  SIGN_IN_EMAIL_CHANGED,
  SIGN_IN_PASSWORD_CHANGED,
  REGISTER_NAME_CHANGED,
  REGISTER_EMAIL_CHANGED,
  REGISTER_PASSWORD_CHANGED,
  UPDATE_ENTRIES
} from "./constants.js";
import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "5dc4f1f03f2740fbaffdbb786de801d4"
});

export const setNewRoute = route => dispatch => {
  if (route === "signout") {
    dispatch({ type: SIGNING_OUT, payload: "signin" });
  } else {
    dispatch({ type: ROUTE_CHANGED, payload: route });
  }
};

// POST Request to Sign In
// this function returns a function due to fetch call, so we dispatch
// once done the status of sign in
export const signInSubmit = (email, password) => dispatch => {
  dispatch({ type: SIGN_IN_PENDING });

  fetch("http://localhost:3001/signin", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .then(user => {
      if (user) {
        dispatch({ type: SIGN_IN_SUCCESS, payload: "home", userData: user });
      } else {
        dispatch({ type: SIGN_IN_FAILED, payload: "signin" });
      }
    });
};

export const setSignInEmail = email => ({
  type: SIGN_IN_EMAIL_CHANGED,
  payload: email
});

export const setSignInPassword = password => ({
  type: SIGN_IN_PASSWORD_CHANGED,
  payload: password
});

// POST Request to Register
// this function returns a function due to fetch call, so we dispatch
// once done the status of sign in
export const registerSubmit = (name, email, password) => dispatch => {
  fetch("http://localhost:3001/register", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  })
    .then(res => res.json())
    .then(user => {
      if (user) {
        // load User Data on Home Page
        dispatch({ type: REGISTER_SUCCESS, payload: "home", userData: user });
      } else {
        dispatch({ type: REGISTER_FAILED, payload: "register" });
      }
    });
};

export const setRegisterEmail = email => ({
  type: REGISTER_EMAIL_CHANGED,
  payload: email
});

export const setRegisterPassword = password => ({
  type: REGISTER_PASSWORD_CHANGED,
  payload: password
});

export const setRegisterName = name => ({
  type: REGISTER_NAME_CHANGED,
  payload: name
});

export const setUrlField = url => ({
  type: URL_CHANGED,
  payload: url
});

export const generateFaces = (url, id) => dispatch => {
  // Clarifai API is working now
  dispatch({ type: CALCULATING_FACES_PENDING });

  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, url)
    // response successful increment entries
    .then(response => {
      // if successful there is an output response
      if (response) {
        fetch("http://localhost:3001/image", {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id
          })
        })
          .then(response => response.json())
          .then(count => dispatch({ type: UPDATE_ENTRIES, payload: count }));
      }
      return response;
    })
    .then(imageData => constructFaceBox(imageData))
    .then(boxData =>
      dispatch({ type: CALCULATING_FACES_SUCCESS, payload: boxData })
    )
    .catch(error =>
      dispatch({ type: CALCULATING_FACES_FAILED, payload: error })
    );
};

const constructFaceBox = data => {
  const faces = data.outputs[0].data.regions;

  return faces.map(region => {
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    const box = region.region_info.bounding_box;
    return {
      leftCol: Number(box.left_col * width),
      topRow: Number(box.top_row * height),
      rightCol: Number(width - box.right_col * width),
      bottomRow: Number(height - box.bottom_row * height)
    };
  });
};
