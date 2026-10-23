"use client";

import { useCallback, useEffect, useRef } from "react";
import { useAnimationFrame } from "motion/react";
import { cn } from "@/lib/utils";

// Adapted from the official Aceternity Stars Background canvas renderer.
// Adds drifting stars, shooting stars, cursor attraction and connections, touch waves,
// theme colors and a Motion frame driver that unmounts while paused.
// Source: https://ui.aceternity.com/registry/stars-background.json

type Point = { x: number; y: number; vx: number; vy: number; depth: number; radius: number; phase: number; opacity: number };
type Pulse = { x: number; y: number; started: number };
type Connection = { from: { x: number; y: number }; to: Point; distance: number };
type ShootingStar = { x: number; y: number; vx: number; vy: number; age: number; lifetime: number };
type Field = {
  canvas: HTMLCanvasElement; context: CanvasRenderingContext2D;
  width: number; height: number; time: number; carry: number;
  points: Point[]; pointer: { x: number; y: number; targetX: number; targetY: number; presence: number; active: boolean; expires: number };
  pulses: Pulse[]; shootingStars: ShootingStar[]; nextShootingStar: number;
  colors: { point: string; line: string; accent: string }; opacity: number;
};
const waveDuration = 1800;

function random(index: number) {
  const value = Math.sin((index + 1) * 127.1) * 43758.5453;
  return value - Math.floor(value);
}

function generatePoints(width: number, height: number, density: number): Point[] {
  const phone = width < 768;
  const count = Math.min(phone ? 26 : 90, Math.max(phone ? 18 : 48, Math.floor(width * height * density)));
  return Array.from({ length: count }, (_, index) => {
    const x = (0.025 + random(index * 5) * .95) * width;
    const y = (.025 + random(index * 5 + 1) * .95) * height;
    const depth = .4 + random(index * 7 + 4) * .6;
    const direction = random(index * 7 + 5) * Math.PI * 2;
    const speed = (.004 + random(index * 7 + 6) * .006) * depth;
    const vx = Math.cos(direction) * speed;
    const vy = Math.sin(direction) * speed;
    return { x, y, vx, vy,
      depth, radius: .55 + depth * .85, phase: random(index * 5 + 3) * Math.PI * 2, opacity: .14 + depth * .3 };
  });
}

function readColors(field: Field) {
  const styles = getComputedStyle(document.documentElement);
  field.colors = {
    point: styles.getPropertyValue("--studio-network-point").trim() || "#91a4b8",
    line: styles.getPropertyValue("--studio-network-line").trim() || "#7193aa",
    accent: styles.getPropertyValue("--studio-accent").trim() || "#46d5f4",
  };
  field.opacity = Number(styles.getPropertyValue("--studio-network-opacity")) || 1;
}

function launchShootingStar(field: Field, x?: number, y?: number) {
  const seed = Math.floor(field.time / 100);
  field.shootingStars = [...field.shootingStars.slice(-1), {
    x: x ?? field.width * (.16 + random(seed) * .45),
    y: y ?? 20 + random(seed + 1) * Math.min(100, field.height * .16),
    vx: .32 + random(seed + 2) * .12, vy: .075 + random(seed + 3) * .035,
    age: 0, lifetime: 1400,
  }];
}

function aimPointer(field: Field, x: number, y: number, expires = Infinity) {
  const pointer = field.pointer;
  if (!pointer.active && pointer.presence < .01) { pointer.x = x; pointer.y = y; }
  pointer.targetX = x; pointer.targetY = y; pointer.active = true; pointer.expires = expires;
}

function paint(field: Field, delta: number) {
  const { context, width, height, points, pointer } = field;
  field.time += delta;
  if (field.time > pointer.expires) pointer.active = false;
  const follow = 1 - Math.exp(-delta * .002);
  pointer.x += (pointer.targetX - pointer.x) * follow;
  pointer.y += (pointer.targetY - pointer.y) * follow;
  pointer.presence += ((pointer.active ? 1 : 0) - pointer.presence) * follow;
  field.pulses = field.pulses.filter(pulse => field.time - pulse.started < waveDuration);
  points.forEach(point => {
    point.x += point.vx * delta;
    point.y += point.vy * delta;
    // Wrap outside the viewport before building links, keeping every link short.
    if (point.x > width + 16) point.x = -16;
    else if (point.x < -16) point.x = width + 16;
    if (point.y < -16) point.y = height + 16;
    else if (point.y > height + 16) point.y = -16;
  });
  if (delta > 0 && field.time >= field.nextShootingStar) {
    launchShootingStar(field);
    field.nextShootingStar = field.time + 6500 + random(Math.floor(field.time)) * 4500;
  }
  field.shootingStars = field.shootingStars.filter(star => {
    star.age += delta; star.x += star.vx * delta; star.y += star.vy * delta;
    return star.age < star.lifetime && star.x < width + 80 && star.y < height + 80;
  });
  const radius = width < 768 ? 145 : 205;
  const nearby = pointer.presence > .01 ? points.filter(point => Math.hypot(point.x - pointer.x, point.y - pointer.y) < radius) : [];
  const connected = new Set(nearby);
  const links: Connection[] = [];
  // Distance is the only connection rule. Include every nearby star and every
  // nearby pair, without a link count, nearest-star selection or tree limit.
  nearby.forEach((point, index) => {
    links.push({ from: pointer, to: point, distance: Math.hypot(point.x - pointer.x, point.y - pointer.y) });
    for (let peerIndex = index + 1; peerIndex < nearby.length; peerIndex++) {
      const peer = nearby[peerIndex];
      const distance = Math.hypot(point.x - peer.x, point.y - peer.y);
      if (distance < radius) links.push({ from: point, to: peer, distance });
    }
  });
  const strength = new Map([...connected].map(point => [point, (1 - Math.hypot(point.x - pointer.x, point.y - pointer.y) / radius) * pointer.presence]));
  const ease = 1 - Math.exp(-delta * .0026);

  points.forEach(point => {
    let targetVx = point.vx, targetVy = point.vy;
    let forceX = 0, forceY = 0, release = 0;
    for (const pulse of field.pulses) {
      const dx = point.x - pulse.x, dy = point.y - pulse.y;
      const distance = Math.max(1, Math.hypot(dx, dy));
      const progress = (field.time - pulse.started) / waveDuration;
      const envelope = Math.sin(progress * Math.PI) ** 2;
      const falloff = Math.max(0, 1 - distance / 240);
      const force = envelope * falloff ** 2 * .012;
      forceX += dx / distance * force;
      forceY += dy / distance * force;
      release = Math.max(release, envelope * falloff);
    }
    const influence = pointer.active ? (strength.get(point) ?? 0) * (1 - release) : 0;
    if (influence > 0) {
      const dx = pointer.x - point.x, dy = pointer.y - point.y;
      const distance = Math.max(1, Math.hypot(dx, dy));
      const pull = Math.min(Math.max(0, distance - 24) * .00055, .045);
      targetVx += (dx / distance * pull - point.vx) * influence;
      targetVy += (dy / distance * pull - point.vy) * influence;
    }
    const forceScale = Math.min(1, .012 / Math.max(.001, Math.hypot(forceX, forceY)));
    targetVx += forceX * forceScale; targetVy += forceY * forceScale;
    // Ease velocity, never position. Once disconnected, preserve this exact
    // heading and speed rather than steering back to an original drift vector.
    const speedScale = Math.min(1, .065 / Math.max(.001, Math.hypot(targetVx, targetVy)));
    point.vx += (targetVx * speedScale - point.vx) * ease;
    point.vy += (targetVy * speedScale - point.vy) * ease;
  });

  context.clearRect(0, 0, width, height);
  context.lineWidth = .7;
  context.strokeStyle = field.colors.line;
  for (const link of links) {
    context.globalAlpha = (.04 + (1 - link.distance / radius) ** 2 * .12) * field.opacity * pointer.presence;
    context.beginPath(); context.moveTo(link.from.x, link.from.y); context.lineTo(link.to.x, link.to.y); context.stroke();
  }
  for (const pulse of field.pulses) {
    const progress = (field.time - pulse.started) / waveDuration;
    context.globalAlpha = .14 * (1 - progress) ** 2 * field.opacity;
    context.beginPath(); context.arc(pulse.x, pulse.y, 18 + progress * 210, 0, Math.PI * 2); context.stroke();
  }
  points.forEach(point => {
    const influence = strength.get(point) ?? 0;
    context.fillStyle = influence > .2 ? field.colors.accent : field.colors.point;
    const twinkle = .9 + Math.sin(field.time * .001 + point.phase) * .1;
    context.globalAlpha = (point.opacity * twinkle + influence * .5) * field.opacity;
    context.beginPath(); context.arc(point.x, point.y, point.radius * (1 + influence * .5), 0, Math.PI * 2); context.fill();
  });
  for (const star of field.shootingStars) {
    const speed = Math.hypot(star.vx, star.vy);
    const tailX = star.x - star.vx / speed * 58, tailY = star.y - star.vy / speed * 58;
    const trail = context.createLinearGradient(tailX, tailY, star.x, star.y);
    trail.addColorStop(0, "transparent"); trail.addColorStop(1, field.colors.point);
    context.globalAlpha = Math.sin(star.age / star.lifetime * Math.PI) * .6 * field.opacity;
    context.strokeStyle = trail; context.lineWidth = 1;
    context.beginPath(); context.moveTo(tailX, tailY); context.lineTo(star.x, star.y); context.stroke();
    context.fillStyle = field.colors.point;
    context.beginPath(); context.arc(star.x, star.y, 1.4, 0, Math.PI * 2); context.fill();
  }
  context.globalAlpha = 1;
  field.canvas.dataset.activePoints = String(connected.size);
  field.canvas.dataset.links = String(links.length);
  field.canvas.dataset.shootingStars = String(field.shootingStars.length);
}

function MotionFrames({ onFrame }: { onFrame: (delta: number) => void }) {
  useAnimationFrame((_, delta) => onFrame(delta));
  return null;
}

export function StarsBackground({ paused = false, starDensity = .000055, className }: { paused?: boolean; starDensity?: number; className?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const field = useRef<Field | null>(null);
  const advance = useCallback((delta: number) => {
    const current = field.current;
    if (!current) return;
    current.carry += delta;
    if (current.carry < 25) return;
    paint(current, Math.min(current.carry, 50));
    current.carry = 0;
  }, []);
  useEffect(() => {
    const element = canvas.current;
    const context = element?.getContext("2d");
    if (!element || !context) return;
    const resize = () => {
      const { width, height } = element.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      element.width = Math.round(width * dpr); element.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const time = field.current?.time ?? 0;
      field.current = { canvas: element, context, width, height, time, carry: 0,
        points: generatePoints(width, height, starDensity), pointer: { x: 0, y: 0, targetX: 0, targetY: 0, presence: 0, active: false, expires: Infinity }, pulses: [],
        shootingStars: [], nextShootingStar: time + 2200,
        colors: { point: "", line: "", accent: "" }, opacity: 1 };
      readColors(field.current); paint(field.current, 0);
      element.dataset.particleCount = String(field.current.points.length);
    };
    const theme = () => { if (field.current) { readColors(field.current); paint(field.current, 0); } };
    const resizeObserver = new ResizeObserver(resize);
    const themeObserver = new MutationObserver(theme);
    resizeObserver.observe(element);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-portfolio-theme"] });
    resize();
    return () => { resizeObserver.disconnect(); themeObserver.disconnect(); field.current = null; };
  }, [starDensity]);

  useEffect(() => {
    const current = field.current;
    if (paused) {
      if (current) {
        current.pointer.active = false; current.pointer.presence = 0; current.pulses = []; current.shootingStars = []; current.carry = 0;
        current.nextShootingStar = Math.max(current.nextShootingStar, current.time + 1200);
        paint(current, 0);
      }
      return;
    }
    const move = (event: PointerEvent) => {
      const state = field.current;
      if (!state) return;
      if (event.pointerType === "touch") { state.pointer.active = false; state.pointer.presence = 0; state.pulses = []; state.shootingStars = []; return; }
      aimPointer(state, event.clientX, event.clientY);
    };
    const leave = () => { const state = field.current; if (state) { state.pointer.active = false; state.pulses = []; state.shootingStars = []; paint(state, 0); } };
    const out = (event: PointerEvent) => { if (!event.relatedTarget) leave(); };
    const press = (event: PointerEvent) => {
      const state = field.current;
      if (!state || !event.isPrimary || event.button !== 0 || (event.target instanceof Element && event.target.closest('a, button, input, textarea, select, label, [role="button"], [role="combobox"]'))) return;
      state.pulses = [...state.pulses.slice(-1), { x: event.clientX, y: event.clientY, started: state.time }];
      if (event.pointerType === "touch") aimPointer(state, event.clientX, event.clientY, state.time + 700);
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", press, { passive: true });
    window.addEventListener("pointerout", out, { passive: true });
    window.addEventListener("pointercancel", leave, { passive: true });
    window.addEventListener("blur", leave);
    return () => {
      window.removeEventListener("pointermove", move); window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerout", out); window.removeEventListener("pointercancel", leave); window.removeEventListener("blur", leave);
    };
  }, [paused]);

  return <><canvas ref={canvas} data-neural-field aria-hidden="true" className={cn("absolute inset-0 h-full w-full pointer-events-none", className)} />{!paused && <MotionFrames onFrame={advance} />}</>;
}
