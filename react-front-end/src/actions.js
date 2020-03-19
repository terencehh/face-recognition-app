import {
  URL_CHANGED,
  CALCULATING_FACES_PENDING,
  CALCULATING_FACES_SUCCESS,
  CALCULATING_FACES_FAILED,
  ROUTE_CHANGED,
  SIGNING_IN,
  SIGN_IN_EMAIL_CHANGED,
  SIGN_IN_PASSWORD_CHANGED
} from "./constants.js";
import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "5dc4f1f03f2740fbaffdbb786de801d4"
});

export const setNewRoute = route => ({
  type: ROUTE_CHANGED,
  payload: route
});

export const onSignInSubmit = signData => ({
  type: SIGNING_IN,
  payload_email: signData.email,
  payload_password: signData.password,
});

export const setSignInEmail = email => ({
  type: SIGN_IN_EMAIL_CHANGED,
  payload: email
});

export const setSignInPassword = password => ({
  type: SIGN_IN_PASSWORD_CHANGED,
  payload: password
});

export const setUrlField = url => ({
  type: URL_CHANGED,
  payload: url
});

export const generateFaces = url => dispatch => {
  // Clarifai API is working now
  dispatch({ type: CALCULATING_FACES_PENDING });

  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, url)
    .then(response => constructFaceBox(response))
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
