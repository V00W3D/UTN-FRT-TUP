// src/components/common/SmoothNavbarBuilder.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/SmoothNavBarBuilder.css";

export function SmoothNavbarBuilder({
  logo,
  logoText,
  basePath,
  buttons = [],
  activeMode,
  onModeChange,
  dropdown,
}) {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleSwitch = (mode) => {
    const path = `/${basePath.replace(/^\/?/, "")}/${mode}`;
    onModeChange(mode);
    navigate(path);
  };

  return (
    <nav className="smooth-navbar">
      <div className="smooth-navbar-container">
        {/* 🧡 LOGO */}
        {logo && (
          <div
            className="smooth-logo"
            onClick={() => navigate(basePath || "/")}
          >
            {logo && <img src={logo} alt="Logo" className="smooth-logo-img" />}
            {logoText && <h2>{logoText}</h2>}
          </div>
        )}

        {/* 🍯 NAV BUTTONS */}
        <ul className="smooth-nav">
          {buttons.map((btn) => (
            <li key={btn.mode} className="smooth-nav-item">
              <button
                className={`smooth-nav-btn ${
                  activeMode === btn.mode ? "active" : ""
                }`}
                onClick={() =>
                  btn.dropdown
                    ? setOpenDropdown((prev) => !prev)
                    : handleSwitch(btn.mode)
                }
              >
                <span>{btn.label}</span>
              </button>

              {/* 🩵 Dropdown (solo si existe) */}
              {btn.dropdown && openDropdown && (
                <ul className="smooth-dropdown">
                  {btn.dropdown.map((item) => (
                    <li
                      key={item.label}
                      onClick={() => {
                        setOpenDropdown(false);
                        if (item.onClick) item.onClick();
                        if (item.to) navigate(item.to);
                      }}
                      className="smooth-dropdown-item"
                    >
                      {item.label}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
