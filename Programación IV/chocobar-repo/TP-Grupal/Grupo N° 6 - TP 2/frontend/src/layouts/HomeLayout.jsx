import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import HomeHeader from "../components/Home/HomeHeader";
import "../Styles/HomeLayout.css";

const HomeLayout = () => {
  const videoRef = useRef(null);
  const [audioEnabled, setAudioEnabled] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = 0.5;
    video.muted = !audioEnabled;

    const start = 0;
    const end = 227;

    const handleLoaded = () => (video.currentTime = start);
    const handleTimeUpdate = () => {
      if (video.currentTime >= end) video.currentTime = start;
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
    <div className="home-layout" onClick={handleEnableAudio}>
      {/* 🎥 Fondo con efecto sakura */}
      <video
        ref={videoRef}
        className="home-bg-video"
        src="/ht.mp4"
        autoPlay
        loop
        playsInline
      ></video>

      {/* Contenido */}
      <div className="home-layout-content">
        <header className="home-header-wrapper">
          <HomeHeader />
        </header>

        <main className="home-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HomeLayout;
