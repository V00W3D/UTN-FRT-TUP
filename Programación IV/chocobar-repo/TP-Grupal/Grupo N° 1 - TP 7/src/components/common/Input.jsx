// src/components/common/Input.jsx
import React from 'react';

function Input({ label, id, type = 'text', value, onChange, placeholder = '', required = false, className = '' }) {
  return (
    <div className="input-group">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`input-field ${className}`}
      />
    </div>
  );
}

export default Input;
