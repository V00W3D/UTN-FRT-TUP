import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Estudios from "./Estudios";
import SoftSkills from "./SoftSkills";
import Proyectos from "./Proyectos";
import Idiomas from "./Idiomas";
import Certificados from "./Certificados";

const Main = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <main>

      <Estudios />
      <SoftSkills />
      <Proyectos />
      <Idiomas />
      <Certificados />
      
    </main>
  );
};

export default Main;


