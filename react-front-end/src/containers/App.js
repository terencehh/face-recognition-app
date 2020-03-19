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
  onSignInSubmit,
  setSignInEmail,
  setSignInPassword
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
    isSignedIn: state.router.isSignedIn,
    signInFailed: state.router.signInFailed,
    imageUrl: state.urlField.imageUrl,
    route: state.router.route,
    box: state.faceBoxes.box,
    input: state.urlField.input,
    isPending: state.faceBoxes.isPending,
    error: state.faceBoxes.error,
    signInEmail: state.signInDetails.signInEmail,
    signInPassword: state.signInDetails.signInPassword
  };
};

// dispatch is what triggers the action
const mapDispatchToProps = dispatch => {
  return {
    // input change for image URL
    onInputChange: event => dispatch(setUrlField(event.target.value)),
    // submit for face detection
    onSubmit: url => dispatch(generateFaces(url)),
    // detect when route changes
    onRouteChange: route => dispatch(setNewRoute(route)),

    // input changes for Sign In Component
    onSignInEmailChange: event => dispatch(setSignInEmail(event.target.value)),

    onSignInPasswordChange: event =>
      dispatch(setSignInPassword(event.target.value)),

    onSignInSubmit: (email, password) =>
      dispatch(onSignInSubmit(email, password))
  };
};

class App extends Component {
  render() {
    const {
      isSignedIn,
      signInFailed,
      imageUrl,
      route,
      box,
      input,
      isPending,
      error,
      signInEmail,
      signInPassword,

      //dispatch functions
      onInputChange,
      onSubmit,
      onRouteChange,
      onSignInEmailChange,
      onSignInPasswordChange,
      onSignInSubmit
    } = this.props;

    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />

        {route === "home" ? (
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={onInputChange}
              onSubmit={onSubmit}
              imageUrl={imageUrl}
            />
            <FaceRecognition
              box={box}
              imageUrl={imageUrl}
              input={input}
              isPending={isPending}
              error={error}
            />
          </div>
        ) : route === "signin" ? (
          <SignIn
            onRouteChange={onRouteChange}
            onSignInSubmit={onSignInSubmit}
            onSignInEmailChange={onSignInEmailChange}
            onSignInPasswordChange={onSignInPasswordChange}
            signInEmail={signInEmail}
            signInPassword={signInPassword}
          />
        ) : (
          <Register onRouteChange={onRouteChange} />
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
