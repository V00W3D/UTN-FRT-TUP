// src/layouts/AdminLayout.jsx
import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../components/Admin/AdminHeader";

const AdminLayout = () => {
  const videoRef = useRef(null);
  const [audioEnabled, setAudioEnabled] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = 0.5;
    video.muted = !audioEnabled;

    const start = 0;
    const end = 89;

    const handleLoaded = () => (video.currentTime = start);
    const handleTimeUpdate = () => {
      if (video.currentTime >= end) {
        video.currentTime = start;
      }
    };

    video.addEventListener("loadedmetadata", handleLoaded);
    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      video.removeEventListener("loadedmetadata", handleLoaded);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audioEnabled]);

  const handleEnableAudio = () => {
    if (!audioEnabled) {
      setAudioEnabled(true);
      const video = videoRef.current;
      if (video) {
        video.muted = false;
        video.play().catch(() => {});
      }
    }
  };

  return (
    <div className="admin-layout" onClick={handleEnableAudio}>
      {/* 🎥 Fondo corporativo */}
      <video
        ref={videoRef}
        className="admin-bg-video"
        src="/edbuenardo.mp4"
        autoPlay
        loop
        playsInline
      ></video>

      {/* 🌫️ Overlay glass */}
      <div className="admin-bg-overlay"></div>

      {/* 📦 Contenido principal */}
      <div className="admin-layout-content">
        <header className="admin-header">
          <AdminHeader />
        </header>

        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
