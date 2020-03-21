import {
  URL_CHANGED,
  CALCULATING_FACES_PENDING,
  CALCULATING_FACES_SUCCESS,
  CALCULATING_FACES_FAILED,
  ROUTE_CHANGED,
  SIGNING_OUT,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  SIGN_IN_EMAIL_CHANGED,
  SIGN_IN_PASSWORD_CHANGED,
  CLEAR_SIGN_IN_FIELD,
  REGISTER_FNAME_CHANGED,
  REGISTER_LNAME_CHANGED,
  REGISTER_EMAIL_CHANGED,
  REGISTER_PASSWORD_CHANGED,
  REGISTER_CONFIRM_PASS_CHANGED,
  CLEAR_REGISTER_FIELD,
  UPDATE_ENTRIES,
  RESET_URL,
  RESET_FACE_BOXES,
  CLEAR_REGISTER_ERROR,
  CLEAR_SIGN_IN_ERROR
} from "./constants.js";

export const setNewRoute = route => dispatch => {
  if (route === "signout") {
    dispatch({ type: SIGNING_OUT });
    dispatch({ type: RESET_URL });
    dispatch({ type: RESET_FACE_BOXES });
  } else if (route === "signin") {
    dispatch({ type: CLEAR_REGISTER_FIELD });
    dispatch({ type: CLEAR_REGISTER_ERROR });
    dispatch({ type: ROUTE_CHANGED, payload: route });
  } else {
    dispatch({ type: CLEAR_SIGN_IN_FIELD });
    dispatch({ type: CLEAR_SIGN_IN_ERROR });
    dispatch({ type: ROUTE_CHANGED, payload: route });
  }
};

// POST Request to Sign In
// this function returns a function due to fetch call, so we dispatch
// once done the status of sign in
export const signInSubmit = (email, password) => dispatch => {
  fetch("https://git.heroku.com/protected-scrubland-83638.git/signin", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .then(user => {
      if (user.id) {
        dispatch({ type: SIGN_IN_SUCCESS, payload: "home", userData: user });
        dispatch({ type: CLEAR_SIGN_IN_FIELD });
      } else {
        dispatch({ type: SIGN_IN_FAILED, payload: user });
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
export const registerSubmit = (
  firstName,
  lastName,
  email,
  password,
  confirmPass
) => dispatch => {
  fetch("https://git.heroku.com/protected-scrubland-83638.git/register", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName, email, password, confirmPass })
  })
    .then(res => res.json())
    .then(user => {
      if (user.id) {
        // load User Data on Home Page
        dispatch({ type: REGISTER_SUCCESS, payload: "home", userData: user });
        dispatch({ type: CLEAR_REGISTER_FIELD });
      } else {
        dispatch({ type: REGISTER_FAILED, payload: user });
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

export const setConfirmPassword = confirmPass => ({
  type: REGISTER_CONFIRM_PASS_CHANGED,
  payload: confirmPass
});

export const setRegisterFName = name => ({
  type: REGISTER_FNAME_CHANGED,
  payload: name
});

export const setRegisterLName = name => ({
  type: REGISTER_LNAME_CHANGED,
  payload: name
});

export const setUrlField = url => dispatch => {
  dispatch({ type: URL_CHANGED, payload: url });
};

export const generateFaces = (url, id) => dispatch => {
  // first set the image component + run Clarifai API
  dispatch({ type: CALCULATING_FACES_PENDING, payload: url });

  // api call to clarifai
  fetch("https://git.heroku.com/protected-scrubland-83638.git/imageurl", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      url
    })
  })
    .then(response => response.json())
    // response successful increment entries
    .then(response => {
      // if successful, only then increment entries
      console.log("really successful?", response);
      if (response !== "Unable to Work with API.") {
        fetch("https://git.heroku.com/protected-scrubland-83638.git/image", {
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
    const box = region.region_info.bounding_box;
    return {
      leftCol: Number(box.left_col * width),
      topRow: Number(box.top_row * height),
      rightCol: Number(width - box.right_col * width),
      bottomRow: Number(height - box.bottom_row * height)
    };
  });
};
