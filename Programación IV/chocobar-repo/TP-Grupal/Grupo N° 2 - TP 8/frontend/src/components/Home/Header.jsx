import ProfileCard from "../../utils/ProfileCard";
import HomeNavBar from "./Parts/HomeNavBar";

function Header() {
  return (
    <header className="main-header">
      <div className="header-container">
        <ProfileCard />
        <HomeNavBar />
      </div>
    </header>
  );
}

export default Header;
