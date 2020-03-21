import React from "react";
import "./FaceRecognition.css";

// POSSIBLE: create a loading animation for isPending requests - however, as image loading time is relatively short, no need to do so for now.
const FaceRecognition = ({ box, submittedUrl, isPending, error }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        {error.length === 0 ? (
          <div>
            <img
              id="inputImage"
              alt=""
              src={submittedUrl}
              width="500px"
              height="auto"
            />
            {box.map((face, i) => {
              return (
                <div
                  key={i}
                  className="bounding-box"
                  style={{
                    top: face.topRow,
                    right: face.rightCol,
                    bottom: face.bottomRow,
                    left: face.leftCol
                  }}
                ></div>
              );
            })}
          </div>
        ) : (
          <div>
            <p className="f4 white">
              Error Generating Image. Please check that you have submitted a
              valid image URL and try again.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FaceRecognition;
