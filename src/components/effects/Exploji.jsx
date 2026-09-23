import { useContext, useEffect, useRef } from "react";

import { createPortal } from "react-dom";

import { EnchantmentContext } from "./Enchanted";

export function Exploji({
  emojis = ["✨", "⭐", "💫", "☄️", "🪐", "🛰️"],

  count = 28,

  speed = [260, 760],

  angle = [-160, -20],

  gravity = 1000,
  drag = 0.985,
  bounce = 0.62,

  lifetime = [2800, 4800],

  fadeAt = 0.78,

  size = [18, 38],

  spin = [-540, 540],

  collision = true,

  zIndex = 999999,
}) {
  const enchantment = useContext(EnchantmentContext);

  const containerRef = useRef(null);

  const particles = useRef([]);

  const nextId = useRef(0);

  const lastBurstId = useRef(null);

  const animationFrame = useRef(null);

  const previousTime = useRef(0);

  useEffect(() => {
    const burst = enchantment?.burst;

    if (!burst || burst.id === lastBurstId.current) {
      return;
    }

    lastBurstId.current = burst.id;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const now = performance.now();

    for (let i = 0; i < count; i++) {
      const particleSpeed = randomBetween(speed);

      const radians = degreesToRadians(randomBetween(angle));

      particles.current.push({
        id: nextId.current++,

        emoji: emojis[Math.floor(Math.random() * emojis.length)],

        x: burst.origin.x,

        y: burst.origin.y,

        vx: Math.cos(radians) * particleSpeed,

        vy: Math.sin(radians) * particleSpeed,

        rotation: Math.random() * 360,

        angularVelocity: randomBetween(spin),

        size: randomBetween(size),

        born: now,

        lifetime: randomBetween(lifetime),

        element: null,
      });
    }
  }, [enchantment?.burst, count, emojis, speed, angle, lifetime, size, spin]);

  useEffect(() => {
    previousTime.current = performance.now();

    function tick(now) {
      const container = containerRef.current;

      if (!container) {
        animationFrame.current = requestAnimationFrame(tick);

        return;
      }

      const dt = Math.min((now - previousTime.current) / 1000, 0.033);

      previousTime.current = now;

      const width = window.innerWidth;

      const height = window.innerHeight;

      const dragFactor = Math.pow(drag, dt * 60);

      particles.current = particles.current.filter((particle) => {
        const age = now - particle.born;

        if (age >= particle.lifetime) {
          particle.element?.remove();

          return false;
        }

        particle.vy += gravity * dt;

        particle.vx *= dragFactor;

        particle.vy *= dragFactor;

        particle.x += particle.vx * dt;

        particle.y += particle.vy * dt;

        particle.rotation += particle.angularVelocity * dt;

        const radius = particle.size / 2;

        if (collision) {
          collideWithViewport(particle, width, height, radius, bounce);
        }

        if (!particle.element) {
          particle.element = createParticleElement(particle.emoji);

          container.appendChild(particle.element);
        }

        const progress = age / particle.lifetime;

        const opacity =
          progress <= fadeAt
            ? 1
            : Math.max(0, 1 - (progress - fadeAt) / (1 - fadeAt));

        Object.assign(particle.element.style, {
          fontSize: `${particle.size}px`,

          opacity: String(opacity),

          transform: `
                  translate3d(
                    ${particle.x - radius}px,
                    ${particle.y - radius}px,
                    0
                  )
                  rotate(
                    ${particle.rotation}deg
                  )
                `,
        });

        return true;
      });

      animationFrame.current = requestAnimationFrame(tick);
    }

    animationFrame.current = requestAnimationFrame(tick);

    return () => {
      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current);
      }

      particles.current.forEach((particle) => particle.element?.remove());

      particles.current = [];
    };
  }, [gravity, drag, bounce, fadeAt, collision]);

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex,
      }}
    />,
    document.body,
  );
}

function createParticleElement(emoji) {
  const element = document.createElement("span");

  element.textContent = emoji;

  element.setAttribute("aria-hidden", "true");

  Object.assign(element.style, {
    position: "fixed",

    left: "0",

    top: "0",

    lineHeight: "1",

    pointerEvents: "none",

    userSelect: "none",

    willChange: "transform, opacity",
  });

  return element;
}

function collideWithViewport(particle, width, height, radius, bounce) {
  if (particle.x - radius < 0) {
    particle.x = radius;

    particle.vx = Math.abs(particle.vx) * bounce;
  }

  if (particle.x + radius > width) {
    particle.x = width - radius;

    particle.vx = -Math.abs(particle.vx) * bounce;
  }

  if (particle.y - radius < 0) {
    particle.y = radius;

    particle.vy = Math.abs(particle.vy) * bounce;
  }

  if (particle.y + radius > height) {
    particle.y = height - radius;

    particle.vy = -Math.abs(particle.vy) * bounce;

    particle.vx *= 0.84;
  }
}

function randomBetween([min, max]) {
  return min + Math.random() * (max - min);
}

function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}
