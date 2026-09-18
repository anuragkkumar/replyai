"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

function RepelLetter({
  letter,
  mouseX,
  mouseY,
  radius,
  strength,
  mode,
  stiffness,
  damping,
  mass,
  className,
}) {
  const ref = useRef(null);
  const originX = useRef(0);
  const originY = useRef(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness, damping, mass });
  const springY = useSpring(y, { stiffness, damping, mass });

  // Subtle tilt proportional to horizontal displacement
  const rotate = useTransform(springX, (v) => v * 0.3);

  // Capture original position relative to the container
  useEffect(() => {
    const capture = () => {
      if (!ref.current) return;
      const container = ref.current.closest("[data-text-repel]");
      if (!container) return;
      const cr = container.getBoundingClientRect();
      const lr = ref.current.getBoundingClientRect();
      originX.current = lr.left - cr.left + lr.width / 2;
      originY.current = lr.top - cr.top + lr.height / 2;
    };

    const raf = requestAnimationFrame(capture);
    window.addEventListener("resize", capture);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", capture);
    };
  }, []);

  // React to cursor position changes via motion value subscriptions
  useEffect(() => {
    const update = () => {
      const mx = mouseX.get();
      const my = mouseY.get();
      const dx = originX.current - mx;
      const dy = originY.current - my;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < radius && distance > 0) {
        // Quadratic falloff for natural-feeling force
        const force = ((1 - distance / radius) ** 2) * strength;
        const angle = Math.atan2(dy, dx);
        const dir = mode === "attract" ? -1 : 1;
        x.set(Math.cos(angle) * force * dir);
        y.set(Math.sin(angle) * force * dir);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const unsub1 = mouseX.on("change", update);
    const unsub2 = mouseY.on("change", update);
    return () => {
      unsub1();
      unsub2();
    };
  }, [mouseX, mouseY, radius, strength, mode, x, y]);

  if (letter === " ") {
    return <span className="inline-block whitespace-pre"> </span>;
  }

  return (
    <motion.span
      ref={ref}
      className={cn(
        "inline-block whitespace-pre will-change-transform",
        className
      )}
      style={{ x: springX, y: springY, rotate }}
      aria-hidden
    >
      {letter}
    </motion.span>
  );
}

export function TextRepel({
  text,
  lines,
  className,
  letterClassName,
  radius = 120,
  strength = 45,
  mode = "repel",
  stiffness = 180,
  damping = 14,
  mass = 0.4,
}) {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);

  // If multiple lines are provided (e.g. [{ text: "Reply Smarter.", className: "" }, { text: "Every Time.", className: "text-[var(--primary)]" }])
  const lineItems = lines || (text ? [{ text, className: letterClassName }] : []);
  const fullLabel = lineItems.map((l) => l.text).join(" ");

  return (
    <div
      ref={containerRef}
      data-text-repel
      className={cn(
        "inline-flex flex-col items-center justify-center cursor-default select-none",
        className
      )}
      onMouseMove={(e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }}
      onMouseLeave={() => {
        mouseX.set(-9999);
        mouseY.set(-9999);
      }}
      aria-label={fullLabel}
    >
      {lineItems.map((lineObj, lineIdx) => (
        <div key={lineIdx} className="inline-flex flex-wrap items-center justify-center">
          {lineObj.text.split("").map((letter, i) => (
            <RepelLetter
              key={`${lineIdx}-${i}`}
              letter={letter}
              mouseX={mouseX}
              mouseY={mouseY}
              radius={radius}
              strength={strength}
              mode={mode}
              stiffness={stiffness}
              damping={damping}
              mass={mass}
              className={lineObj.className || letterClassName}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

class Particle {
  constructor(x, y, size, color, dispersion, returnSpd) {
    this.x = x + (Math.random() - 0.5) * 10;
    this.y = y + (Math.random() - 0.5) * 10;
    this.originX = x;
    this.originY = y;
    this.vx = (Math.random() - 0.5) * 5;
    this.vy = (Math.random() - 0.5) * 5;
    this.size = size;
    this.color = color;
    this.dispersion = dispersion;
    this.returnSpd = returnSpd;
  }

  update(mouseX, mouseY) {
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const interactionRadius = 130;

    if (distance < interactionRadius && mouseX !== -1000 && mouseY !== -1000) {
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;
      const force = (interactionRadius - distance) / interactionRadius;

      const repulsionX = forceDirectionX * force * this.dispersion;
      const repulsionY = forceDirectionY * force * this.dispersion;

      this.vx -= repulsionX;
      this.vy -= repulsionY;
    }

    this.vx += (this.originX - this.x) * this.returnSpd;
    this.vy += (this.originY - this.y) * this.returnSpd;

    this.vx *= 0.85;
    this.vy *= 0.85;

    const distToOrigin = Math.sqrt(
      Math.pow(this.x - this.originX, 2) + Math.pow(this.y - this.originY, 2)
    );
    if (distToOrigin < 1 && Math.random() > 0.95) {
      this.vx += (Math.random() - 0.5) * 0.2;
      this.vy += (Math.random() - 0.5) * 0.2;
    }

    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function CursorDrivenParticleTypography({
  className,
  text = "every single time.",
  fontSize = 90,
  fontFamily = "Inter, system-ui, sans-serif",
  particleSize = 1.6,
  particleDensity = 5,
  dispersionStrength = 16,
  returnSpeed = 0.08,
  color = "#ffffff",
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId;
    let particles = [];

    let mouseX = -1000;
    let mouseY = -1000;

    let containerWidth = 0;
    let containerHeight = 0;

    const init = () => {
      const container = containerRef.current;
      if (!container) return;

      containerWidth = container.clientWidth || 600;
      containerHeight = container.clientHeight || 140;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(containerWidth * dpr);
      canvas.height = Math.floor(containerHeight * dpr);
      canvas.style.width = `${containerWidth}px`;
      canvas.style.height = `${containerHeight}px`;

      ctx.save();
      ctx.scale(dpr, dpr);

      const computedStyle = window.getComputedStyle(container);
      const textColor = color || computedStyle.color || "#ffffff";

      ctx.clearRect(0, 0, containerWidth, containerHeight);

      const effectiveFontSize = Math.min(fontSize, Math.max(containerWidth * 0.11, 32));
      ctx.font = `900 ${effectiveFontSize}px ${fontFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = textColor;

      ctx.fillText(text, containerWidth / 2, containerHeight / 2);
      ctx.restore();

      const textCoordinates = ctx.getImageData(0, 0, canvas.width, canvas.height);
      particles = [];

      // Create particles in canvas coordinate space
      const step = Math.max(1, Math.floor(particleDensity * dpr));
      for (let y = 0; y < textCoordinates.height; y += step) {
        for (let x = 0; x < textCoordinates.width; x += step) {
          const index = (y * textCoordinates.width + x) * 4;
          const alpha = textCoordinates.data[index + 3] || 0;

          if (alpha > 128) {
            particles.push(
              new Particle(
                x,
                y,
                particleSize * dpr,
                textColor,
                dispersionStrength * dpr,
                returnSpeed
              )
            );
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update(mouseX, mouseY);
        particle.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      mouseX = (e.clientX - rect.left) * dpr;
      mouseY = (e.clientY - rect.top) * dpr;
    };


    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const handleResize = () => {
      init();
    };

    const timeoutId = setTimeout(() => {
      init();
      animate();
    }, 60);

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("touchstart", (e) => {
      if (!e.touches[0]) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      mouseX = (e.touches[0].clientX - rect.left) * dpr;
      mouseY = (e.touches[0].clientY - rect.top) * dpr;
    });
    canvas.addEventListener("touchmove", (e) => {
      if (!e.touches[0]) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      mouseX = (e.touches[0].clientX - rect.left) * dpr;
      mouseY = (e.touches[0].clientY - rect.top) * dpr;
    });
    canvas.addEventListener("touchend", handleMouseLeave);


    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [text, fontSize, fontFamily, particleSize, particleDensity, dispersionStrength, returnSpeed, color]);

  return (
    <div
      ref={containerRef}
      className={cn("w-full h-[120px] sm:h-[150px] md:h-[180px] flex items-center justify-center relative touch-none select-none", className)}
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full pointer-events-auto"
      />
    </div>
  );
}

export default TextRepel;

