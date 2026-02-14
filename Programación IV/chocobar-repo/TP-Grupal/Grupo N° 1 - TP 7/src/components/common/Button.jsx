// src/components/common/Button.jsx
import React from 'react';

function Button({ children, onClick, type = 'button', className = '' }) {
  return (
    <button type={type} onClick={onClick} className={`btn ${className}`}>
      {children}
    </button>
  );
}

export default Button;
