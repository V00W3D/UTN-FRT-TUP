export default function Footer() {
  return (
    <footer className="bg-dark text-center text-secondary py-4 mt-5 border-top border-success">
      <p className="mb-2">© 2025 Facundo Salvatierra</p>
      <div>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-success mx-2"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-success mx-2"
        >
          GitHub
        </a>
        <a href="#sobre-mi" className="text-success mx-2">
          Volver arriba
        </a>
      </div>
    </footer>
  );
}
