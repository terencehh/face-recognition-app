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
import { setUrlField, setNewRoute, generateFaces } from "../actions";

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
    route: state.router.route,
    isSignedIn: state.router.isSignedIn,
    input: state.urlField.input,
    imageUrl: state.urlField.imageUrl,
    box: state.faceBoxes.box,
    isPending: state.faceBoxes.isPending,
    error: state.faceBoxes.error
  };
};

// dispatch is what triggers the action
const mapDispatchToProps = dispatch => {
  return {
    onInputChange: event => dispatch(setUrlField(event.target.value)),
    onSubmit: url => dispatch(generateFaces(url)),
    onRouteChange: route => dispatch(setNewRoute(route))
  };
};

class App extends Component {
  render() {
    const {
      isSignedIn,
      imageUrl,
      route,
      box,
      onRouteChange,
      onInputChange,
      onSubmit
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
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
        ) : route === "signin" ? (
          <SignIn onRouteChange={onRouteChange} />
        ) : (
          <Register onRouteChange={onRouteChange} />
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
