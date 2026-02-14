import React from "react";

const AuthFieldBuilder = ({ id, type = "text", value, label, onChange }) => {
  return (
    <div className="input-container">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required
        placeholder=" "
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default AuthFieldBuilder;
