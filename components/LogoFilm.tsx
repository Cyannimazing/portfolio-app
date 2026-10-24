"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Player, type PlayerRef } from "@remotion/player";
import { AbsoluteFill, Img, useBufferState, useCurrentFrame, useVideoConfig } from "remotion";
import partsByTheme from "@/lib/logo-film-parts.json";
import { getLogoAssemblyBounds, getLogoFilmLayout, getLogoPartPose, logoFilmFps, logoFilmFrames, logoProgress, logoShineEnd, logoShineStart, logoSymbol } from "@/lib/logo-film-timing";
import styles from "./LogoIntro.module.css";

export type LogoFilmProps = {
  light: boolean;
  onReady: () => void;
  onComplete: () => void;
  onUnavailable: () => void;
};

type CompositionProps = Pick<LogoFilmProps, "light" | "onReady" | "onUnavailable">;

function LogoComposition({ light, onReady, onUnavailable }: CompositionProps) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const time = frame / fps;
  const parts = light ? partsByTheme.themes.light : partsByTheme.themes.dark;
  const bounds = useMemo(() => getLogoAssemblyBounds(parts), [parts]);
  const buffer = useBufferState();
  const layout = getLogoFilmLayout(width, height, bounds);

  useEffect(() => {
    let active = true;
    const waiting = buffer.delayPlayback();
    let readyFrame = 0;
    // Decode the exact current-theme curves and settle the font before time
    // starts. Slow connections never play half an assembled logo.
    const images = parts.map(part => {
      const image = new Image();
      image.src = part.src;
      return image.decode();
    });
    void Promise.all([...images, document.fonts.ready]).then(() => {
      if (!active) return;
      readyFrame = requestAnimationFrame(() => {
        if (!active) return;
        waiting.unblock();
        onReady();
      });
    }).catch(() => {
      waiting.unblock();
      if (active) onUnavailable();
    });
    return () => {
      active = false;
      cancelAnimationFrame(readyFrame);
      waiting.unblock();
    };
  }, [buffer, parts, onReady, onUnavailable]);

  const lockup = logoProgress(time, 2.8, 3.65);
  const markHeight = layout.markHeight + (layout.finalMarkHeight - layout.markHeight) * lockup;
  const scale = markHeight / logoSymbol.height;
  const markY = layout.markCenterY + (layout.finalMarkCenterY - layout.markCenterY) * lockup;
  const name = logoProgress(time, 3.5, 4.25);
  const shining = time >= logoShineStart && time < logoShineEnd;
  const sheen = Math.min(1, Math.max(0, (time - logoShineStart) / (logoShineEnd - logoShineStart)));
  const sheenOpacity = (light ? .56 : .68)
    * logoProgress(time, logoShineStart, logoShineStart + .25)
    * (1 - logoProgress(time, logoShineEnd - .3, logoShineEnd));
  const source = `/brand/cyril-ai-logo-${light ? "light" : "dark"}.webp`;

  return (
    <AbsoluteFill className={styles.composition} data-logo-film-frame={frame} data-logo-film-theme={light ? "light" : "dark"}>
      <div className={styles.symbolStage} data-logo-symbol style={{
        transform: `translate(${width / 2}px, ${markY}px) scale(${scale}) translate(${-logoSymbol.centerX}px, ${-logoSymbol.centerY}px)`,
      }}>
        {parts.map(part => {
          const pose = getLogoPartPose(time, part);
          return <Img key={part.part} src={part.src} alt="" className={styles.symbolPart} data-logo-part={part.role} style={{
            left: part.x,
            top: part.y,
            width: part.width,
            height: part.height,
            opacity: pose.opacity,
            transformOrigin: `${part.pivotX - part.x}px ${part.pivotY - part.y}px`,
            transform: `translate(${pose.x}px, ${pose.y}px) rotate(${pose.rotation}deg)`,
          }} />;
        })}
        {shining && <div className={styles.symbolSheen} data-logo-shine="symbol" style={{
          maskImage: `url("${source}")`,
          WebkitMaskImage: `url("${source}")`,
          opacity: sheenOpacity,
        }}><div className={styles.sheenBand} style={{ transform: `translateX(${-85 + sheen * 170}%)` }} /></div>}
      </div>
      <div className={styles.filmTitle} data-logo-wordmark style={{
        top: layout.textTop,
        fontSize: layout.fontSize,
      }}>
        <div className={styles.filmName} style={{
          opacity: logoProgress(time, 3.5, 3.9),
          transform: `translateY(${(1 - name) * 110}%)`,
        }}>
          <span>Cyril</span><span className={styles.ai}>AI</span>
          {shining && <span aria-hidden="true" className={styles.wordSheen} data-logo-shine="wordmark" style={{
            opacity: sheenOpacity,
            backgroundPosition: `${135 - sheen * 170}% 0`,
          }}><span>Cyril</span><span>AI</span></span>}
        </div>
      </div>
    </AbsoluteFill>
  );
}

function UnavailableFilm({ onUnavailable }: Pick<LogoFilmProps, "onUnavailable">) {
  useEffect(onUnavailable, [onUnavailable]);
  return null;
}

export default function LogoFilm({ light, onReady, onComplete, onUnavailable }: LogoFilmProps) {
  const container = useRef<HTMLDivElement>(null);
  const player = useRef<PlayerRef>(null);
  const resumeOnVisible = useRef(false);
  const ended = useRef(false);
  const [size, setSize] = useState({ width: 1280, height: 800 });
  const handleReady = useCallback(() => {
    onReady();
    if (document.hidden) resumeOnVisible.current = true;
    else player.current?.play();
  }, [onReady]);
  const inputProps = useMemo(() => ({ light, onReady: handleReady, onUnavailable }), [light, handleReady, onUnavailable]);

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const measure = () => {
      const rect = element.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width));
      const height = Math.max(1, Math.round(rect.height));
      setSize(previous => previous.width === width && previous.height === height ? previous : { width, height });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const current = player.current;
    if (!current) return;
    const finish = () => { ended.current = true; onComplete(); };
    const fail = () => onUnavailable();
    const visibility = () => {
      if (document.hidden) {
        resumeOnVisible.current = current.isPlaying();
        current.pause();
      } else if (resumeOnVisible.current && !ended.current) {
        resumeOnVisible.current = false;
        current.play();
      }
    };
    current.addEventListener("ended", finish);
    current.addEventListener("error", fail);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      current.removeEventListener("ended", finish);
      current.removeEventListener("error", fail);
      document.removeEventListener("visibilitychange", visibility);
      current.pause();
    };
  }, [onComplete, onUnavailable]);

  return (
    <div ref={container} className={styles.filmPlayer} data-logo-player="remotion">
      <Player
        ref={player}
        component={LogoComposition}
        inputProps={inputProps}
        compositionWidth={size.width}
        compositionHeight={size.height}
        durationInFrames={logoFilmFrames}
        fps={logoFilmFps}
        style={{ width: "100%", height: "100%" }}
        autoPlay={false}
        controls={false}
        loop={false}
        clickToPlay={false}
        doubleClickToFullscreen={false}
        spaceKeyToPlayOrPause={false}
        allowFullscreen={false}
        moveToBeginningWhenEnded={false}
        initiallyShowControls={false}
        initiallyMuted
        numberOfSharedAudioTags={0}
        acknowledgeRemotionLicense
        logLevel="error"
        renderLoading={() => null}
        errorFallback={() => <UnavailableFilm onUnavailable={onUnavailable} />}
      />
    </div>
  );
}
