function Estudios() {
  const estudios = [
    { id: 1, titulo: "Tecnicatura Universitaria en Programación", institucion: "UTN FRT", año: "2024 - Actualidad" },
    { id: 2, titulo: "Bachiller en Ciencias Naturales", institucion: "Colegio Tulio García Fernandez", año: "2017-2022" },
  ];

  return (
    <section id="estudios">
      <h2>Estudios</h2>
      <ul>
        {estudios.map((e) => (
          <li key={e.id}>
            <strong>{e.titulo}</strong> — {e.institucion} ({e.año})
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Estudios;