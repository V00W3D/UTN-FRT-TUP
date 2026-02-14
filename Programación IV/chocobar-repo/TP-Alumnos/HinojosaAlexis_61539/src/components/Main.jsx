import React, { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Experiencia from "./Experiencia.jsx";
import Idiomas from "./Idiomas.jsx";
import Estudios from "./Estudios.jsx";
import Certificados from "./Certificados.jsx";
import Proyectos from "./Proyectos.jsx";
import SoftSkills from "./SoftSkills.jsx";
import "../styles/App.css";

const slides = [
  { id: 0, Component: Experiencia, title: "Experiencia" },
  { id: 1, Component: Idiomas, title: "Idiomas" },
  { id: 2, Component: Estudios, title: "Estudios" },
  { id: 3, Component: Certificados, title: "Certificados" },
  { id: 4, Component: Proyectos, title: "Proyectos" },
  { id: 5, Component: SoftSkills, title: "SoftSkills" },
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return isMobile;
}
function Main() {
  const [active, setActive] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const carouselRef = useRef(null);
  const isMobile = useIsMobile();

  const autoRotate = true;
  const rotateInterval = 4000;
  const minSwipeDistance = 40;

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!autoRotate || !isInView || isHovering) return;
    const id = setInterval(() => {
      setActive((p) => (p + 1) % slides.length);
    }, rotateInterval);
    return () => clearInterval(id);
  }, [autoRotate, isInView, isHovering]);

  const onTouchStart = (e) => {
    setTouchStart(e.touches ? e.touches[0].clientX : e.clientX);
    setTouchEnd(null);
  };
  const onTouchMove = (e) => {
    setTouchEnd(e.touches ? e.touches[0].clientX : e.clientX);
  };
  const onTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) setActive((p) => (p + 1) % slides.length);
    else if (distance < -minSwipeDistance)
      setActive((p) => (p - 1 + slides.length) % slides.length);
  };

  const getClass = (index) => {
    if (index === active) return "card--active";
    if (index === (active + 1) % slides.length) return "card--next";
    if (index === (active - 1 + slides.length) % slides.length) return "card--prev";
    return "card--hidden";
  };
  // portal root for controls (render on body so controls ignore ancestor transforms)
  const [portalRoot, setPortalRoot] = useState(null);
  useEffect(() => setPortalRoot(typeof document !== "undefined" ? document.body : null), []);

  return (
    <>
      <section className="three-d-carousel" aria-roledescription="carousel">
        <div
          className="three-d-carousel__wrap"
          ref={carouselRef}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="three-d-carousel__stage">
            {slides.map((s, idx) => {
              const SlideComponent = s.Component;
              return (
                <div
                  key={s.id}
                  className={`three-d-carousel__card ${getClass(idx)}`}
                  aria-hidden={idx !== active}
                >
                  <div className="card__inner">
                    <h1 className="card__title">{s.title}</h1>
                    <div className="card__component">
                      <SlideComponent />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* indicators removed per request */}
        </div>
      </section>

      {portalRoot &&
        createPortal(
          !isMobile && (
            <>
              <button
                className="three-d-carousel__control left"
                onClick={() => setActive((p) => (p - 1 + slides.length) % slides.length)}
                aria-label="Previous"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                className="three-d-carousel__control right"
                onClick={() => setActive((p) => (p + 1) % slides.length)}
                aria-label="Next"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          ),
          portalRoot
        )}
    </>
  );
}

export default Main;