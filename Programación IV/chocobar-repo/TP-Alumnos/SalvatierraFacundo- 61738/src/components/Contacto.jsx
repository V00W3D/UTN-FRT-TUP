const contactos = [
  {
    tipo: "Email",
    valor: "salvatierrafacundo63@gmail.com",
    enlace: "mailto:salvatierrafacundo63@gmail.com",
  },
  {
    tipo: "GitHub",
    valor: "github.com/Corcho97",
    enlace: "https://github.com/Corcho97",
  },
  {
    tipo: "Celular",
    valor: "+54 381 2015084",
    enlace: "tel:+543812015084",
  },
];

export default function Contacto() {
  return (
    <section id="contacto" className="text-center mb-5">
      <h2 className="text-success mb-4">Contacto</h2>
      <p className="lead mb-4">
        Si querés ponerte en contacto conmigo, podés hacerlo por los siguientes medios:
      </p>
      <div className="row justify-content-center">
        {contactos.map((c, index) => (
          <div key={index} className="col-md-3 mb-3">
            <div className="card card-contacto h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-success mt-2">{c.tipo}</h5>
                <a
                  href={c.enlace}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-text"
                >
                  {c.valor}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
