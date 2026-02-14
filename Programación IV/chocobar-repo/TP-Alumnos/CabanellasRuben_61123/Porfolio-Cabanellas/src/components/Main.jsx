import React from 'react'
import Estudios from './Estudios'
import SoftSkills from './SoftSkills'
import Proyectos from './Proyectos'
import Experiencia from './Experiencia'
import Idiomas from './Idiomas'
import Certificados from './Certificados'

function Main() {
  return (
    <main>
      <section className="mb-4">
        <h2>Sobre mí</h2>
        <p>
          Me llamo Rubén Cabanellas tengo 42 años y estoy en la busqueda de mi primer empleo formal en el rubro IT como  C#.Net Developer junior, actualmente vengo realizando mi carrera de forma Freelancer.
Hace casi 2 años  y medios que vengo estudiando C# .net en diferentes cursos y actualmente continuo en formación en el curso de Maxi Programa; también me encuentro cursando Java Full Stack en el Programa Codo a Codo Y terminando la carrea en Tecnicatura Universitaria en Progranación, en la Universidad Tecnológica Nacional, Regional Tucumán.
        </p>
      </section>

      <Estudios />
      <SoftSkills />
      <Proyectos />
      <Experiencia />
      <Idiomas />
      <Certificados />
    </main>
  )
}

export default Main
