import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome,FaUser, FaDumbbell, FaCalendarCheck, FaHistory, FaBars } from "react-icons/fa";
import "./Navbar.css";
import { useAuth } from "../../context/AuthContext";

function SidebarNavbar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
       <div className="top-section">
        <h1 className="gym-title">Gimnasio</h1>
        <button className="toggle-btn" onClick={toggleSidebar}>
          <FaBars />
        </button>
      </div>
      <nav className="nav-menu">
         <NavLink to="/" className="nav-link">
          <FaHome className="nav-icon" /> <span className="link-text">Home</span>
        </NavLink>
        <NavLink to="/socios" className="nav-link">
          <FaUser className="nav-icon" /> <span className="link-text">Socios</span>
        </NavLink>
        <NavLink to="/actividades" className="nav-link">
          <FaDumbbell className="nav-icon" /> <span className="link-text">Actividades</span>
        </NavLink>
        <NavLink to="/reservas" className="nav-link">
          <FaCalendarCheck className="nav-icon" /> <span className="link-text">Reservas</span>
        </NavLink>
        <NavLink to="/historial" className="nav-link">
          <FaHistory className="nav-icon" /> <span className="link-text">Historial</span>
        </NavLink>
        {user ? (
          <button className="nav-link" onClick={logout} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
            Salir
          </button>
        ) : (
          <NavLink to="/login" className="nav-link">Ingresar</NavLink>
        )}
      </nav>
    </div>
  );
}

export default SidebarNavbar;
