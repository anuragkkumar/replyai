"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

function DockItem({
  item,
  mouseX,
  iconSize,
  maxScale,
  magneticDistance,
  showLabels,
  isVertical,
  reducedMotion,
  position = "bottom",
}) {
  const ref = React.useRef(null);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const showLabel = showLabels && (isHovered || isFocused);

  // Calculate distance from mouse to center of item
  const distance = useTransform(mouseX, (val) => {
    if (!ref.current) return magneticDistance + 1;
    const rect = ref.current.getBoundingClientRect();
    const center = isVertical
      ? rect.top + rect.height / 2
      : rect.left + rect.width / 2;
    return val - center;
  });

  // Scale based on distance - closer = larger
  const scale = useTransform(
    distance,
    [-magneticDistance, 0, magneticDistance],
    [1, maxScale, 1]
  );

  // Apply spring physics for smooth animation
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothScale = useSpring(scale, springConfig);

  // Calculate the size based on scale
  const size = useTransform(smoothScale, (s) => s * iconSize);

  // Floating effect
  const y = useTransform(smoothScale, (s) => (s - 1) * -8);
  const smoothY = useSpring(y, springConfig);

  const isTop = position === "top";

  return (
    <motion.button
      ref={ref}
      type="button"
      tabIndex={0}
      aria-label={item.label}
      aria-current={item.isActive ? "page" : undefined}
      onClick={item.onClick}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative flex items-center justify-center",
        "rounded-2xl transition-colors duration-200 cursor-pointer",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
        item.isActive && "ring-1 ring-[var(--primary)]/60 bg-[var(--primary)]/10"
      )}
      style={{
        width: reducedMotion ? iconSize : size,
        height: reducedMotion ? iconSize : size,
        y: reducedMotion || isVertical ? 0 : smoothY,
        x: reducedMotion || !isVertical ? 0 : smoothY,
      }}
      whileTap={reducedMotion ? undefined : { scale: 0.9 }}
    >
      {/* Icon Container */}
      <motion.div
        className={cn(
          "relative w-full h-full rounded-2xl overflow-hidden",
          "bg-neutral-900/90 dark:bg-neutral-900/90",
          "backdrop-blur-md",
          "border border-neutral-700/80 dark:border-neutral-700/80",
          "shadow-lg shadow-black/30",
          "flex items-center justify-center",
          "transition-colors duration-200",
          item.isActive && "border-[var(--primary)]/80 text-[var(--primary)] shadow-[var(--primary)]/20"
        )}
        style={{
          boxShadow: isHovered
            ? "0 8px 32px rgba(83,74,183,0.3), inset 0 1px 0 rgba(255,255,255,0.2)"
            : "0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        {/* Icon */}
        <div
          aria-hidden="true"
          className={cn(
            "w-[60%] h-[60%] flex items-center justify-center transition-colors duration-200",
            item.isActive ? "text-[var(--primary)]" : "text-neutral-200 hover:text-white"
          )}
        >
          {item.icon}
        </div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%, transparent 100%)",
            opacity: isHovered ? 0.9 : 0.4,
          }}
        />
      </motion.div>

      {/* Badge */}
      <AnimatePresence initial={false}>
        {item.badge !== undefined && item.badge > 0 && (
          <motion.div
            initial={reducedMotion ? false : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { scale: 0, opacity: 0 }}
            className={cn(
              "absolute -top-1 -right-1",
              "min-w-[20px] h-5 px-1.5",
              "rounded-full",
              "bg-[var(--primary)]",
              "text-white text-xs font-semibold",
              "flex items-center justify-center",
              "border-2 border-neutral-950",
              "shadow-lg"
            )}
          >
            {item.badge > 99 ? "99+" : item.badge}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Indicator */}
      <AnimatePresence initial={false}>
        {item.isActive && (
          <motion.div
            initial={reducedMotion ? false : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { scale: 0, opacity: 0 }}
            className={cn(
              "absolute",
              isTop ? "-top-1.5" : "-bottom-2",
              "w-1.5 h-1.5 rounded-full",
              "bg-[var(--primary)] shadow-[0_0_8px_var(--primary)]"
            )}
          />
        )}
      </AnimatePresence>

      {/* Tooltip */}
      <AnimatePresence initial={false}>
        {showLabel && (
          <motion.div
            aria-hidden="true"
            initial={
              reducedMotion
                ? false
                : { opacity: 0, y: isTop ? -6 : 8, scale: 0.9 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: isTop ? -6 : 8, scale: 0.9 }
            }
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cn(
              "absolute left-1/2 -translate-x-1/2",
              isTop ? "top-full mt-2" : "-top-10",
              "px-3 py-1.5 rounded-lg",
              "bg-neutral-900/95 text-white text-xs font-medium whitespace-nowrap",
              "backdrop-blur-md",
              "border border-neutral-700/80",
              "shadow-xl shadow-black/40",
              "pointer-events-none z-50"
            )}
          >
            {item.label}
            {/* Tooltip arrow */}
            <div
              className={cn(
                "absolute left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-neutral-900/95",
                isTop
                  ? "-top-1 border-l border-t border-neutral-700/80"
                  : "-bottom-1 border-r border-b border-neutral-700/80"
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          boxShadow: isHovered
            ? "0 0 24px rgba(83,74,183,0.35)"
            : "0 0 0px rgba(83,74,183,0)",
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}

export function MagneticDock({
  items,
  iconSize = 42,
  maxScale = 1.35,
  magneticDistance = 120,
  showLabels = true,
  position = "bottom",
  variant = "glass",
  className,
}) {
  const mousePosition = useMotionValue(Infinity);
  const reducedMotion = useReducedMotion() ?? false;
  const isVertical = position === "left" || position === "right";

  const handleMouseMove = React.useCallback(
    (e) => {
      if (isVertical) {
        mousePosition.set(e.clientY);
      } else {
        mousePosition.set(e.clientX);
      }
    },
    [mousePosition, isVertical]
  );

  const handleMouseLeave = () => {
    mousePosition.set(Infinity);
  };

  const variantStyles = {
    glass: cn(
      "bg-neutral-900/75 backdrop-blur-xl backdrop-saturate-150",
      "border border-neutral-800"
    ),
    solid: cn(
      "bg-neutral-900",
      "border border-neutral-800"
    ),
    transparent: "bg-transparent border-0 shadow-none",
  };

  const positionStyles = {
    bottom: "flex-row",
    top: "flex-row",
    left: "flex-col",
    right: "flex-col",
  };

  return (
    <motion.div
      onMouseMove={reducedMotion ? undefined : handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "inline-flex items-center gap-2 p-2 rounded-2xl",
        variantStyles[variant],
        positionStyles[position],
        "shadow-xl shadow-black/20",
        className
      )}
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {items.map((item) => (
        <DockItem
          key={item.id}
          item={item}
          mouseX={mousePosition}
          iconSize={iconSize}
          maxScale={maxScale}
          magneticDistance={magneticDistance}
          showLabels={showLabels}
          isVertical={isVertical}
          reducedMotion={reducedMotion}
          position={position}
        />
      ))}
    </motion.div>
  );
}

// Preset icons for common use cases
export function DockIconHome({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-full h-full", className)}
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

export function DockIconSearch({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-full h-full", className)}
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export function DockIconFolder({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-full h-full", className)}
    >
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export function DockIconMail({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-full h-full", className)}
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

export function DockIconMusic({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-full h-full", className)}
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

export function DockIconSettings({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-full h-full", className)}
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

export function DockIconTrash({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-full h-full", className)}
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

export default MagneticDock;
