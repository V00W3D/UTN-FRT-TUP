const miembros = [
  {
    imagen: "./Imagenes/DRJJ.jpg",
    imagen2: "./Imagenes/DRJJ(elegido).jpeg",
    nombre: "Díaz Rossini Juan José",
    edad: 18,
    dni: "47356613",
    legajo: "61744",
    telefono: "+54 9 381 301-6487",
    gif: "./Imagenes/Marco.gif"
  },
  {
    imagen: "./Imagenes/GG.jpeg",
    imagen2: "./Imagenes/GG(elegido).jpg",
    nombre: "Gallo Genaro",
    edad: 22,
    dni: "44741529",
    legajo: "61909",
    telefono: "+54 9 381 338-7802",
    gif: "./Imagenes/Fio.gif"
  },
  {
    imagen: "./Imagenes/LGE.jpeg",
    imagen2: "./Imagenes/LGE(elegido).jpeg",
    nombre: "Liacoplo Gerónimo Emiliano",
    edad: 21,
    dni: "44978285",
    legajo: "61306",
    telefono: "+54 9  381 319-9374",
    gif: "./Imagenes/Tarma.gif"
  },
  {
    imagen: "./Imagenes/NVL.jpeg",
    imagen2: "./Imagenes/NVL(elegido).jpeg",
    nombre: "Navarro Victor Leandro",
    edad: 18,
    dni: "47356699",
    legajo: "61550",
    telefono: "+54 9 381 555-9420",
    gif: "./Imagenes/Eri.gif"
  },
];

const ids = ["DRJJ", "GG", "LGE", "NVL"];

for (let i = 0; i < miembros.length; i++) {
  const persona = miembros[i];
  const contenedor = document.getElementById(ids[i]);
  contenedor.classList.add("card");

  contenedor.innerHTML = `    
        <img src="${persona.imagen}" alt="${persona.nombre}" class="miembro-imagen">
        <h3>${persona.nombre}</h3>
        <p>Edad: ${persona.edad}</p>
        <p>DNI: ${persona.dni}</p>
        <p>Legajo: ${persona.legajo}</p>
        <p>Teléfono: ${persona.telefono}</p>
        
    `;
}
const tarjetas = document.querySelectorAll(".card");
const sonidoHover = new Audio("./sonidos/metal-slug-obtain-sfx.mp3");
const sonidoClick = new Audio("./sonidos/metal-slug-scream.mp3");
const musicaFondo = document.getElementById("musicaFondo");

let seleccionadoIndex = null; 

tarjetas.forEach((tarjeta, index) => {
  const persona = miembros[index];
  if (!persona || !persona.nombre) return;

  const img = tarjeta.querySelector("img");

  tarjeta.addEventListener("mouseenter", () => {
    sonidoHover.currentTime = 0;
    sonidoHover.play();
  });

  tarjeta.addEventListener("click", () => {
    tarjetas.forEach((t, i) => {
      const otraImg = t.querySelector("img");
      const quitarGif = t.querySelector(".miembro-gif");
      if (miembros[i] && miembros[i].imagen) {
        otraImg.src = miembros[i].imagen;
        sonidoClick.currentTime = 0;
        sonidoClick.play();
      }
      if (quitarGif) {
        quitarGif.remove();
      }
    });

    if (persona.imagen2) {
      img.src = persona.imagen2;
    }

    if (seleccionadoIndex === index) return;
    seleccionadoIndex = index;

    alert(`¡Escogiste a ${persona.nombre}!`);
    alert("¡MISSION START!");
    document.getElementById(ids[index]).innerHTML += `
    <img src="${persona.gif}" alt="${persona.nombre} GIF" class="miembro-gif">
    `;
    musicaFondo.pause();
    musicaFondo.currentTime = 0;

    sonidoClick.onended = () => {
      musicaFondo.play();
    };
  });
});



