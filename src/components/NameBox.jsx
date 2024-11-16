import React from "react";

const NameBox = ({ name }) => {
  const formatThefirstletter = (name) => name.charAt(0).toUpperCase();

  return (
    <div className="onemail-name">
      <p>{formatThefirstletter(name)} </p>
    </div>
  );
};

export default NameBox;
