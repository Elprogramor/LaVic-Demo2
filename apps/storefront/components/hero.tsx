"use client";

import Link from "next/link";
import {
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type TouchEvent as ReactTouchEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { homeContent } from "@/content/home";
import { heroSlides } from "@/content/hero-slides";

const AUTOPLAY_MS = 6500;
const SWIPE_THRESHOLD = 44;
const EASE = [0.22, 1, 0.36, 1] as const;

const copyVariants = {
  enter: (direction: number) => ({ opacity: 0, y: direction > 0 ? 12 : -12 }),
  center: { opacity: 1, y: 0 },
  exit: (direction: number) => ({ opacity: 0, y: direction > 0 ? -10 : 10 })
};

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
      <path
        d={direction === "left" ? "M14.5 5 7.5 12l7 7" : "m9.5 5 7 7-7 7"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Hero() {
  const hero = homeContent.hero;
  const reducedMotion = Boolean(useReducedMotion());
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const slide = heroSlides[activeIndex];
  const autoRotationEnabled = !reducedMotion && !hoverPaused && !focusPaused && !userPaused && !pageHidden;

  const goTo = useCallback((nextIndex: number, nextDirection: number) => {
    setDirection(nextDirection);
    setActiveIndex((nextIndex + heroSlides.length) % heroSlides.length);
  }, []);

  const goNext = useCallback(() => goTo(activeIndex + 1, 1), [activeIndex, goTo]);
  const goPrevious = useCallback(() => goTo(activeIndex - 1, -1), [activeIndex, goTo]);

  useEffect(() => {
    if (!autoRotationEnabled) return;
    const timer = window.setTimeout(goNext, AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [activeIndex, autoRotationEnabled, goNext]);

  useEffect(() => {
    const onVisibilityChange = () => setPageHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibilityChange);
    onVisibilityChange();
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    const useMobileArtwork = window.matchMedia("(max-width: 900px)").matches;
    const images = heroSlides
      .filter((_, index) => index !== activeIndex)
      .map((item) => {
        const image = new window.Image();
        image.src = useMobileArtwork ? item.banner.mobile : item.banner.desktop;
        return image;
      });

    return () => images.forEach((image) => { image.src = ""; });
  }, [activeIndex]);

  const handleTouchStart = (event: ReactTouchEvent<HTMLElement>) => {
    const touch = event.changedTouches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: ReactTouchEvent<HTMLElement>) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) <= Math.abs(deltaY) * 1.2) return;

    if (deltaX < 0) goNext();
    else goPrevious();
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrevious();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
  };

  const rootStyle = {
    "--hero-headline": slide.colors.headline,
    "--hero-control": slide.colors.control,
    "--hero-surface": slide.colors.surface,
    "--hero-position-desktop": slide.banner.desktopPosition,
    "--hero-position-mobile": slide.banner.mobilePosition
  } as CSSProperties;

  return (
    <section
      className={`hero-carousel hero-carousel--${slide.theme}`}
      id="inicio"
      aria-labelledby="hero-title"
      aria-roledescription="carrossel"
      aria-label="Destaques LaVic"
      style={rootStyle}
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocusCapture={() => setFocusPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocusPaused(false);
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
    >
      <div className="hero-carousel__banner-stage" aria-live="off">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={`banner-${slide.id}`}
            className="hero-carousel__banner-layer"
            initial={{ opacity: 0, scale: reducedMotion ? 1 : 1.018 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: reducedMotion ? 1 : 0.995 }}
            transition={{ duration: reducedMotion ? 0.18 : 0.92, ease: EASE }}
          >
            <picture className="hero-carousel__picture">
              <source media="(max-width: 900px)" srcSet={slide.banner.mobile} />
              <img
                src={slide.banner.desktop}
                alt={slide.banner.alt}
                className="hero-carousel__banner-image"
                loading={activeIndex === 0 ? "eager" : "lazy"}
                fetchPriority={activeIndex === 0 ? "high" : "auto"}
                decoding="async"
                draggable={false}
              />
            </picture>
          </motion.div>
        </AnimatePresence>
        <div className="hero-carousel__readability" aria-hidden="true" />
        <div className="hero-carousel__edge-shade" aria-hidden="true" />
      </div>

      <div className="site-container hero-carousel__grid">
        <div className="hero-carousel__copy">
          <p className="hero-carousel__kicker">KOMBUCHA LAVIC</p>
          <h1 className="hero-carousel__headline" id="hero-title">
            <span>{hero.titleTop}</span>
            <span>{hero.titleBottom}</span>
          </h1>

          <div className="hero-carousel__dynamic-copy" aria-live={userPaused ? "polite" : "off"} aria-atomic="true">
            <AnimatePresence initial={false} mode="wait" custom={direction}>
              <motion.div
                key={slide.id}
                custom={direction}
                variants={copyVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: reducedMotion ? 0.16 : 0.4, ease: EASE }}
              >
                <p className="hero-carousel__product-name">{slide.descriptor}</p>
                <p className="hero-carousel__lead">{slide.body}</p>
                <Link className="button hero-carousel__cta" href={slide.href}>
                  {slide.ctaLabel}
                  <ArrowIcon direction="right" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <button className="hero-carousel__edge-arrow hero-carousel__edge-arrow--previous" type="button" onClick={goPrevious} aria-label="Produto anterior">
        <ArrowIcon direction="left" />
      </button>
      <button className="hero-carousel__edge-arrow hero-carousel__edge-arrow--next" type="button" onClick={goNext} aria-label="Próximo produto">
        <ArrowIcon direction="right" />
      </button>

      <div className="site-container hero-carousel__controls" aria-label="Controles do carrossel">
        <div className="hero-carousel__counter" aria-hidden="true">
          <span>{slide.index}</span><small>/</small><span>0{heroSlides.length}</span>
        </div>
        <div className="hero-carousel__progress" aria-hidden="true">
          <span
            key={`progress-${activeIndex}`}
            className={`hero-carousel__progress-fill${reducedMotion ? " is-static" : ""}`}
            style={{ animationDuration: `${AUTOPLAY_MS}ms`, animationPlayState: autoRotationEnabled ? "running" : "paused" }}
          />
        </div>
        {!reducedMotion && (
          <button
            className={`hero-carousel__autoplay${userPaused ? " is-paused" : ""}`}
            type="button"
            onClick={() => setUserPaused((value) => !value)}
            aria-label={userPaused ? "Retomar rotação automática" : "Pausar rotação automática"}
            aria-pressed={userPaused}
          >
            <span aria-hidden="true" />
          </button>
        )}
      </div>
    </section>
  );
}
