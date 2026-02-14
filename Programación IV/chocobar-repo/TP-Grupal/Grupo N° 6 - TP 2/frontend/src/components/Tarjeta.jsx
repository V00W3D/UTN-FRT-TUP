export default function Tarjeta({ titulo, contenido }) {
  return (
    <div className="border rounded p-4 shadow mb-4 bg-white">
      <h3 className="font-bold mb-2">{titulo}</h3>
      <p>{contenido}</p>
    </div>
  );
}
