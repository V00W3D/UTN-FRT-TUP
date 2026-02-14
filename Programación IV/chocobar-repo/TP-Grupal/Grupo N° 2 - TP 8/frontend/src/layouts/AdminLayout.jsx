import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Admin/Header";
import Footer from "../components/Admin/Footer";
const AdminLayout = () => {
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
    <>
      <Header />
      <main className="main-layout container my-4" onClick={handleEnableAudio}>
        <video
          ref={videoRef}
          className="auth-bg-video"
          src="/jojoopso.mp4"
          autoPlay
          loop
          playsInline
        ></video>

        <div className="main-overlay"></div>

        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AdminLayout;
