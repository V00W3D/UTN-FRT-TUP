import React from 'react';
import { FaCertificate } from "react-icons/fa";
import Cert1 from "../assets/certificado.jpeg"; 
function Certificados() {
  const certificados = [
    { id: 1, nombre: "React - Coderhouse", año: "2023", img: Cert1 },
  ];

  return (
    <section id="certificados">
      <h2><FaCertificate /> Certificados</h2>
      <ul className="certificados-list">
        {certificados.map((cert) => (
          <li key={cert.id}>
            <h3>{cert.nombre} ({cert.año})</h3>
            <img 
              src={cert.img} 
              alt={cert.nombre} 
              style={{
                width: '250px', 
                borderRadius: '12px', 
                marginTop: '10px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
              }} 
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Certificados;
