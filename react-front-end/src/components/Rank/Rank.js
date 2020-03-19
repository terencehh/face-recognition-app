import React from "react";

const EntryCount = ({ name, entries }) => {
  return (
    <div>
      <div className="f3">{`${name}, your current entry count
       is...`}</div>
      <div className="f1">{entries}</div>
    </div>
  );
};

export default EntryCount;
