// src/layouts/AuthLayout.jsx
import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import AuthHeader from "../components/Auth/AuthHeader";
import "../Styles/AuthLayout.css";

const AuthLayout = () => {
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
        video.currentTime = start; // vuelve a ese punto → loop falso
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
        video.play().catch(() => {}); // evita error si autoplay falla
      }
    }
  };
  return (
    <div
      className="auth-layout"
      onClick={handleEnableAudio} // 🎵 activa sonido al primer clic
    >
      {/* 🎥 Fondo con efecto sakura */}
      <video
        ref={videoRef}
        className="auth-bg-video"
        src="/kobayashied1.mp4"
        autoPlay
        loop
        playsInline
      ></video>
      {/* Contenido */}
      <div className="auth-layout-content">
        <header className="header">
          <AuthHeader />
        </header>
        <main className="main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
