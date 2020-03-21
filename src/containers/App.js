import React, { Component } from "react";
import "./App.css";
import Navigation from "../components/Navigation/Navigation";
import Logo from "../components/Logo/Logo";
import Rank from "../components/Rank/Rank";
import ImageLinkForm from "../components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "../components/FaceRecognition/FaceRecognition.js";
import SignIn from "../components/SignIn/SignIn";
import Register from "../components/Register/Register";
import Particles from "react-particles-js";
import { connect } from "react-redux";
import {
  setUrlField,
  setNewRoute,
  generateFaces,
  signInSubmit,
  setSignInEmail,
  setSignInPassword,
  registerSubmit,
  setRegisterEmail,
  setRegisterFName,
  setRegisterLName,
  setRegisterPassword,
  setConfirmPassword
} from "../actions";

const particleOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: "#ffffff"
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000"
      },
      polygon: {
        nb_sides: 8
      },
      image: {
        src: "img/github.svg",
        width: 100,
        height: 100
      }
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 6,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: false,
        mode: "repulse"
      },
      onclick: {
        enable: false,
        mode: "push"
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 0,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3
      },
      repulse: {
        distance: 200,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: true
};

const mapStateToProps = state => {
  return {
    // default user state
    route: state.userDefaults.route,
    isSignedIn: state.userDefaults.isSignedIn,
    signInFailed: state.userDefaults.signInFailed,
    registerFailed: state.userDefaults.registerFailed,
    userProfile: state.userDefaults.userProfile,

    // url field state
    imageUrl: state.urlField.imageUrl,

    // faceBox state
    submittedUrl: state.faceBoxes.submittedUrl,
    box: state.faceBoxes.box,
    isPending: state.faceBoxes.isPending,
    error: state.faceBoxes.error,

    // sign in state
    signInEmail: state.signIn.email,
    signInPassword: state.signIn.password,

    // register state
    registerFName: state.register.firstName,
    registerLName: state.register.lastName,
    registerEmail: state.register.email,
    registerPass: state.register.password,
    registerConfirmPass: state.register.confirmPass
  };
};

// dispatch is what triggers the action
const mapDispatchToProps = dispatch => {
  return {
    // input change for image URL
    onInputChange: event => dispatch(setUrlField(event.target.value)),
    // submit for face detection
    onPictureSubmit: (url, id) => dispatch(generateFaces(url, id)),
    // detect when route changes
    onRouteChange: route => dispatch(setNewRoute(route)),

    // SIGN IN SECTION
    onSignInEmailChange: event => dispatch(setSignInEmail(event.target.value)),

    onSignInPasswordChange: event =>
      dispatch(setSignInPassword(event.target.value)),

    onSignInSubmit: (email, password) =>
      dispatch(signInSubmit(email, password)),

    // REGISTER SECTION
    onRegisterEmailChange: event =>
      dispatch(setRegisterEmail(event.target.value)),

    onRegisterFNameChange: event =>
      dispatch(setRegisterFName(event.target.value)),

    onRegisterLNameChange: event =>
      dispatch(setRegisterLName(event.target.value)),

    onRegisterPasswordChange: event =>
      dispatch(setRegisterPassword(event.target.value)),

    onConfirmPassChange: event =>
      dispatch(setConfirmPassword(event.target.value)),

    onRegisterSubmit: (firstName, lastName, email, password, confirmPass) =>
      dispatch(
        registerSubmit(firstName, lastName, email, password, confirmPass)
      )
  };
};

class App extends Component {
  render() {
    const {
      // userDefaults info
      route,
      isSignedIn,
      signInFailed, // display error message when sign in failed
      registerFailed, // display error message when register failed
      userProfile,

      // register info
      registerFName,
      registerLName,
      registerEmail,
      registerPass,
      registerConfirmPass,

      // sign in info
      signInEmail,
      signInPassword,

      // image url info
      imageUrl,

      //face detection image box info
      submittedUrl,
      box,
      isPending, // use to display loading bar when loading
      error, // use to display error message when API call failed

      //dispatch functions
      onInputChange,
      onPictureSubmit,
      onRouteChange,
      onSignInEmailChange,
      onSignInPasswordChange,
      onSignInSubmit,
      onRegisterSubmit,
      onRegisterFNameChange,
      onRegisterLNameChange,
      onRegisterEmailChange,
      onRegisterPasswordChange,
      onConfirmPassChange
    } = this.props;

    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />

        {route === "home" ? (
          <div>
            <Logo />
            <Rank name={userProfile.firstname} entries={userProfile.entries} />
            <ImageLinkForm
              onInputChange={onInputChange}
              onPictureSubmit={onPictureSubmit}
              imageUrl={imageUrl}
              id={userProfile.id}
            />
            <div>
              <FaceRecognition
                box={box}
                submittedUrl={submittedUrl}
                isPending={isPending}
                error={error}
              />
            </div>
          </div>
        ) : route === "signin" ? (
          <SignIn
            email={signInEmail}
            pass={signInPassword}
            onEmailChange={onSignInEmailChange}
            onPassChange={onSignInPasswordChange}
            onSubmit={onSignInSubmit}
            onRouteChange={onRouteChange}
            signInFailed={signInFailed}
          />
        ) : (
          <Register
            firstName={registerFName}
            lastName={registerLName}
            email={registerEmail}
            pass={registerPass}
            confirmPass={registerConfirmPass}
            onFirstNameChange={onRegisterFNameChange}
            onLastNameChange={onRegisterLNameChange}
            onEmailChange={onRegisterEmailChange}
            onPassChange={onRegisterPasswordChange}
            onConfirmPassChange={onConfirmPassChange}
            onSubmit={onRegisterSubmit}
            registerFailed={registerFailed}
          />
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
