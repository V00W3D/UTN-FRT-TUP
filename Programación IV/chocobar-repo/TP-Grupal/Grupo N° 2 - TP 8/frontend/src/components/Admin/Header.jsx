import ProfileCard from "../../utils/ProfileCard";
import AdminNavBar from "./Parts/AdminNavBar";

function Header() {
  return (
    <header className="main-header">
      <div className="header-container">
        <ProfileCard />
        <AdminNavBar />
      </div>
    </header>
  );
}

export default Header;
