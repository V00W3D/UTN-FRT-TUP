export default function Header() 
{
  return (
    <header className="site-header">
      <div className="container">
        <img className="avatar" src="/pp.jpg" alt="Foto de perfil" />
        <h1>Carrascosa Suarez Francisco Eduardo</h1>
        <p className="subtitle">Desarrollador Web Full Stack</p>
        <nav className="site-nav" aria-label="Secciones">
          <a href="#sobre-mi">Sobre mi</a>
          <a href="#habilidades">Habilidades</a>
          <a href="#certificados">Certificados</a>
          <a href="#contacto">Contacto</a>
        </nav>
      </div>
    </header>
  );
}

