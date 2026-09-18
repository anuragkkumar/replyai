import React, { useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

// Helper to interpolate between two hex colors
function lerpColor(color1, color2, t) {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);
  if (!c1 || !c2) return color1;

  const r = Math.round(c1.r + (c2.r - c1.r) * t);
  const g = Math.round(c1.g + (c2.g - c1.g) * t);
  const b = Math.round(c1.b + (c2.b - c1.b) * t);

  return `rgb(${r}, ${g}, ${b})`;
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function PixelCanvas({
  className,
  gap = 14,
  speed = 0.02,
  colors = ["#10B981", "#84CC16", "#059669", "#34D399", "#A7F3D0"],
  noFocus = false,
  variant = "glow",
  globalTracking = true,
  ...props
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const pixelsRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef(0);
  const lastTimeRef = useRef(0);

  const getColorFromIntensity = useCallback(
    (intensity, phase) => {
      if (!colors || colors.length === 0) return "#10B981";
      if (colors.length === 1) return colors[0];

      // Use phase + intensity to create a shifting color effect
      const t = (phase + intensity) % 1;
      const index = Math.floor(t * (colors.length - 1));
      const nextIndex = Math.min(index + 1, colors.length - 1);
      const localT = (t * (colors.length - 1)) % 1;

      const color1 = colors[index];
      const color2 = colors[nextIndex];

      if (!color1) return "#10B981";
      if (!color2) return color1;

      return lerpColor(color1, color2, localT);
    },
    [colors]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let cols = 0;
    let rows = 0;
    const pixelSize = Math.max(gap, 6);

    const initPixels = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      cols = Math.ceil(rect.width / pixelSize);
      rows = Math.ceil(rect.height / pixelSize);

      const newPixels = [];
      for (let i = 0; i < cols; i++) {
        const row = [];
        for (let j = 0; j < rows; j++) {
          const existing = pixelsRef.current[i]?.[j];
          row.push({
            x: i * pixelSize,
            y: j * pixelSize,
            size: pixelSize - 2,
            intensity: existing?.intensity ?? 0,
            targetIntensity: 0,
            colorPhase: Math.random(),
          });
        }
        newPixels.push(row);
      }
      pixelsRef.current = newPixels;
    };

    const draw = (timestamp) => {
      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const { x: mouseX, y: mouseY } = mouseRef.current;
      const pixels = pixelsRef.current;

      const radius = variant === "glow" ? 140 : 90;
      const glowPasses = variant === "glow" ? 2 : 1;

      for (let i = 0; i < cols; i++) {
        const col = pixels[i];
        if (!col) continue;

        for (let j = 0; j < rows; j++) {
          const pixel = col[j];
          if (!pixel) continue;

          const centerX = pixel.x + pixel.size / 2;
          const centerY = pixel.y + pixel.size / 2;
          const dx = mouseX - centerX;
          const dy = mouseY - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < radius) {
            const falloff = 1 - distance / radius;
            pixel.targetIntensity = Math.pow(falloff, 1.4);
          } else {
            pixel.targetIntensity = 0;
          }

          const lerpSpeed =
            pixel.targetIntensity > pixel.intensity ? 0.35 : speed;

          pixel.intensity += (pixel.targetIntensity - pixel.intensity) * lerpSpeed;
          pixel.colorPhase = (pixel.colorPhase + 0.001 * (deltaTime / 16)) % 1;

          if (pixel.intensity > 0.015) {
            const color = getColorFromIntensity(pixel.intensity, pixel.colorPhase);

            if (variant === "glow" && pixel.intensity > 0.15) {
              for (let g = glowPasses; g > 0; g--) {
                const glowSize = pixel.size + g * 4;
                const glowOffset = (glowSize - pixel.size) / 2;
                ctx.globalAlpha = (pixel.intensity * 0.1) / g;
                ctx.fillStyle = color;
                ctx.fillRect(
                  pixel.x - glowOffset,
                  pixel.y - glowOffset,
                  glowSize,
                  glowSize
                );
              }
            }

            ctx.globalAlpha = pixel.intensity * 0.8;
            ctx.fillStyle = color;

            if (variant === "trail") {
              const cornerRadius = pixel.size * 0.3;
              ctx.beginPath();
              ctx.roundRect(pixel.x, pixel.y, pixel.size, pixel.size, cornerRadius);
              ctx.fill();
            } else {
              ctx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size);
            }
          }
        }
      }

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(draw);
    };

    const updateMouse = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const handleWindowMouseMove = (e) => {
      updateMouse(e.clientX, e.clientY);
    };

    const handleWindowTouchMove = (e) => {
      if (e.touches.length > 0 && e.touches[0]) {
        updateMouse(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleWindowMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    initPixels();
    lastTimeRef.current = performance.now();
    animationRef.current = requestAnimationFrame(draw);

    window.addEventListener("resize", initPixels);

    if (!noFocus) {
      if (globalTracking) {
        window.addEventListener("mousemove", handleWindowMouseMove);
        window.addEventListener("touchmove", handleWindowTouchMove, { passive: true });
        window.addEventListener("mouseleave", handleWindowMouseLeave);
        window.addEventListener("touchend", handleWindowMouseLeave);
      } else {
        container.addEventListener("mousemove", handleWindowMouseMove);
        container.addEventListener("mouseleave", handleWindowMouseLeave);
        container.addEventListener("touchmove", handleWindowTouchMove, { passive: true });
        container.addEventListener("touchend", handleWindowMouseLeave);
      }
    }

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", initPixels);
      if (globalTracking) {
        window.removeEventListener("mousemove", handleWindowMouseMove);
        window.removeEventListener("touchmove", handleWindowTouchMove);
        window.removeEventListener("mouseleave", handleWindowMouseLeave);
        window.removeEventListener("touchend", handleWindowMouseLeave);
      } else {
        container.removeEventListener("mousemove", handleWindowMouseMove);
        container.removeEventListener("mouseleave", handleWindowMouseLeave);
        container.removeEventListener("touchmove", handleWindowTouchMove);
        container.removeEventListener("touchend", handleWindowMouseLeave);
      }
    };
  }, [gap, speed, noFocus, variant, globalTracking, getColorFromIntensity]);

  return (
    <div
      ref={containerRef}
      className={cn("h-full w-full relative overflow-hidden pointer-events-none", className)}
      {...props}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

export default PixelCanvas;
