import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
   useEffect(() => {
     document.body.classList.add('home-bg');
     return () => document.body.classList.remove('home-bg');
   }, []);
   const navigate = useNavigate();

  const handleStart = () => {
    navigate("/socios"); //  redirige a la ruta de socios
  };

  return (
    <div className="home-container">
      
      <div className="content">
        <h1 className="titulo"> Bienvenido al Sistema de Gestión de Reservas</h1>
        <p className="descripcion">
          Gestioná socios, actividades y reservas de manera rápida y sencilla.
        </p>
        <p className="subtexto">Tu gimnasio, organizado a tu medida.</p>
           <button className="boton-ingresar" onClick={handleStart}>
          Empezar ahora
        </button>
      </div>
    </div>
  );
}

export default Home;

