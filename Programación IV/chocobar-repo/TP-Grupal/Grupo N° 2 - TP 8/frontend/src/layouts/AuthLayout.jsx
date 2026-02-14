import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import AuthNavBar from "../components/Auth/AuthNavBar";
import "../CSS/AuthLayout.css";

const AuthLayout = () => {
  const videoRef = useRef(null);
  const [audioEnabled, setAudioEnabled] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = 0.1;
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
      style={{ minHeight: "100vh" }}
      onClick={handleEnableAudio} // 🎵 activa sonido al primer clic
    >
      <video
        ref={videoRef}
        className="auth-bg-video"
        src="/KobayashiEnding.mp4"
        autoPlay
        loop
        playsInline
      ></video>

      <AuthNavBar />

      <div
        className="flex-grow-1 d-flex justify-content-center align-items-center w-100"
        style={{ maxWidth: 1220 }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
