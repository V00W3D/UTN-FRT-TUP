export const profile = {
  name: 'Luis Barrionuevo',
  role: 'Estudiante TUP · Backend/Data',
  location: 'San Miguel de Tucumán, Argentina',
  about: 'Apasionado por Python, SQL y Data Engineering. Fan de Batman. 🙂'
}

export const estudios = [
  { titulo: 'Tecnicatura Univ. en Programación', institucion: 'UTN Tucumán', anio: '2025 (en curso)' },
  { titulo: 'IBM Data Engineer (Cert.)', institucion: 'Coursera', anio: '2025' }
]

export const softSkills = ['Trabajo en equipo', 'Comunicación', 'Proactividad', 'Aprendizaje continuo']

export const proyectos = [
  {
    title: 'Bromatología DB',
    description: 'Modelo relacional y dashboard de actuaciones',
    tech: ['MySQL', 'Python', 'Flask', 'MUI'],
    link: 'https://github.com/tu_usuario/bromatologia-db'
  },
  {
    title: 'Data Football Analysis',
    description: 'Exploración y visualización de estadísticas',
    tech: ['Pandas', 'NumPy', 'Matplotlib'],
    link: 'https://github.com/tu_usuario/data-football'
  }
]

export const experiencia = [
  { empresa: 'Municipalidad SMT · Bromatología', puesto: 'Soporte/ Datos', periodo: '2024–Presente' }
]

export const idiomas = [
  { idioma: 'Español', nivel: 'Nativo' },
  { idioma: 'Inglés', nivel: 'Intermedio' }
]

export const certificados = [
  { nombre: 'Python for Data Analyst', entidad: 'Coursera/IBM', anio: '2025' }
]

export default {
  profile,
  estudios,
  softSkills,
  proyectos,
  experiencia,
  idiomas,
  certificados
}
