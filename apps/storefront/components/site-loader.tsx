"use client";

import { useEffect, useRef, useState } from "react";

const SESSION_KEY = "lavic:intro-played:v030";
const STARTUP_TIMEOUT_MS = 10000;
const REFRESH_PREVIEW_MS = 600;
const FINAL_HOLD_MS = 160;
const REVEAL_MS = 780;

type LoaderPhase = "checking" | "playing" | "leaving" | "hidden";
type PlaybackMode = "full" | "preview";

export function SiteLoader() {
  const [phase, setPhase] = useState<LoaderPhase>("checking");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playbackModeRef = useRef<PlaybackMode>("full");
  const forcedReplayRef = useRef(false);
  const finishedRef = useRef(false);
  const playbackStartedRef = useRef(false);
  const playRequestedRef = useRef(false);
  const previewTimerStartedRef = useRef(false);

  const startupTimer = useRef<number | null>(null);
  const previewTimer = useRef<number | null>(null);
  const holdTimer = useRef<number | null>(null);
  const exitTimer = useRef<number | null>(null);

  useEffect(() => {
    const forced =
      window.location.hash === "#intro" || window.location.hash === "#intro=1";
    const alreadyPlayed = window.sessionStorage.getItem(SESSION_KEY) === "1";

    forcedReplayRef.current = forced;
    playbackModeRef.current = alreadyPlayed && !forced ? "preview" : "full";
    finishedRef.current = false;
    playbackStartedRef.current = false;
    playRequestedRef.current = false;
    previewTimerStartedRef.current = false;

    document.body.classList.add("lavic-intro-active");
    document.body.classList.remove("lavic-intro-revealing");
    setPhase("playing");

    // Protects only against media that never starts. Once playback begins this
    // timer is cleared and can no longer interrupt the intro.
    startupTimer.current = window.setTimeout(() => {
      if (!playbackStartedRef.current) {
        finishWithoutPlayback();
      }
    }, STARTUP_TIMEOUT_MS);

    return () => {
      cleanupTimers();
      clearRevealClasses();
    };
  }, []);

  function cleanupTimers() {
    if (startupTimer.current !== null) {
      window.clearTimeout(startupTimer.current);
      startupTimer.current = null;
    }

    if (previewTimer.current !== null) {
      window.clearTimeout(previewTimer.current);
      previewTimer.current = null;
    }

    if (holdTimer.current !== null) {
      window.clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }

    if (exitTimer.current !== null) {
      window.clearTimeout(exitTimer.current);
      exitTimer.current = null;
    }
  }

  function clearRevealClasses() {
    document.body.classList.remove("lavic-intro-active");
    document.body.classList.remove("lavic-intro-revealing");
  }

  function clearStartupTimer() {
    playbackStartedRef.current = true;

    if (startupTimer.current !== null) {
      window.clearTimeout(startupTimer.current);
      startupTimer.current = null;
    }
  }

  function finishWithoutPlayback() {
    if (finishedRef.current) return;
    finishedRef.current = true;
    cleanupTimers();
    clearRevealClasses();
    setPhase("hidden");
  }

  function beginReveal(markAsPlayed: boolean, holdMs = 0) {
    if (finishedRef.current) return;
    finishedRef.current = true;

    clearStartupTimer();

    if (previewTimer.current !== null) {
      window.clearTimeout(previewTimer.current);
      previewTimer.current = null;
    }

    if (markAsPlayed && !forcedReplayRef.current) {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    }

    const reveal = () => {
      // The page is already mounted beneath the loader. These two state changes
      // happen together so the teal canvas dissolves while the live page gains
      // opacity, sharpness and its final scale.
      document.body.classList.add("lavic-intro-revealing");
      setPhase("leaving");

      exitTimer.current = window.setTimeout(() => {
        setPhase("hidden");
        clearRevealClasses();
      }, REVEAL_MS);
    };

    if (holdMs > 0) {
      holdTimer.current = window.setTimeout(reveal, holdMs);
    } else {
      reveal();
    }
  }

  function handlePlaybackStarted() {
    clearStartupTimer();

    if (
      playbackModeRef.current === "preview" &&
      !previewTimerStartedRef.current
    ) {
      previewTimerStartedRef.current = true;

      previewTimer.current = window.setTimeout(() => {
        videoRef.current?.pause();
        beginReveal(false);
      }, REFRESH_PREVIEW_MS);
    }
  }

  function handleEnded() {
    if (playbackModeRef.current === "preview") {
      beginReveal(false);
      return;
    }

    beginReveal(!forcedReplayRef.current, FINAL_HOLD_MS);
  }

  async function startVideo() {
    const video = videoRef.current;
    if (!video || finishedRef.current || phase !== "playing") return;
    if (playRequestedRef.current) return;

    playRequestedRef.current = true;

    try {
      video.currentTime = 0;
      await video.play();
    } catch {
      playRequestedRef.current = false;
      finishWithoutPlayback();
    }
  }

  if (phase === "hidden") return null;

  return (
    <div
      className={`site-loader ${phase === "leaving" ? "site-loader--leaving" : ""}`}
      aria-hidden="true"
    >
      {phase !== "checking" ? (
        <div className="site-loader__media">
          <video
            ref={videoRef}
            className="site-loader__video"
            muted
            playsInline
            preload="auto"
            autoPlay
            onCanPlay={startVideo}
            onLoadedData={startVideo}
            onPlay={handlePlaybackStarted}
            onPlaying={handlePlaybackStarted}
            onEnded={handleEnded}
            onError={finishWithoutPlayback}
          >
            <source src="/media/lavic-loader.webm" type="video/webm" />
            <source src="/media/lavic-loader.mp4" type="video/mp4" />
          </video>
        </div>
      ) : null}
    </div>
  );
}
