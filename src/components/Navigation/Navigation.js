import React from "react";

const Navigation = ({ onRouteChange }) => {
  return (
    <nav style={{ display: "flex", justifyContent: "flex-end" }}>
      <p
        onClick={() => onRouteChange("signin")}
        className="f3 link hover-near-black pa4 pointer"
      >
        {" "}
        Sign Out{" "}
      </p>
    </nav>
  );
};

export default Navigation;
