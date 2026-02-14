import Foto from "../assets/Foto.jpeg";
const Header = () => {
  return (
    <>  <div className="Header">  <img
        img src={Foto}
        alt="Foto personal"
        style={{ borderRadius: "50%", width: "150px", height: "150px" }}
      />
      <h1>Marco Teodoro Ricciuti</h1>
      <h2>Desarrollador Web</h2>  </div>
     
    </>
  );
};

export default Header;
