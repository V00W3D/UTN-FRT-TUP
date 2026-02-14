import React from "react";
import "../styles/Header.css"; // importa tu CSS

export default function Header() {
  return (
    <header className="header">
      <img
        src="/496865238_2409006756124694_6789180066907644138_n.jpg"
        alt="Mi foto"
      />
      <h1>Camila Almirón</h1>
      <p>Desarrolladora en formación</p>
    </header>
  );
}
