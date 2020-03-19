import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box, input, isPending, error }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="inputImage"
          alt=""
          src={imageUrl}
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
    </div>
  );
};

export default FaceRecognition;
