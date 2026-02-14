import React from "react";
import Header from "../components/Header";
import SobreMi from "../components/SobreMi";
import Proyectos from "../components/Proyectos";
import Contacto from "../components/Contacto";
import Estudios from "../components/Estudios";
import SoftSkills from "../components/SoftSkills";
import Experiencia from "../components/Experiencia";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Header />

      <main className="container mt-5">
        <section id="sobre-mi">
          <SobreMi />
        </section>


        <section id="proyectos">
          <Proyectos />
        </section>

        <section id="estudios">
            <Estudios />
        </section>

         <section id="softSkills">
          <SoftSkills />
        </section>

        <section id="experiencia">
          <Experiencia />
        </section>


        <section id="contacto">
          <Contacto />
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;
