import { useEffect, useRef } from "react";

const DEFAULT_COLORS = [
  "#ff0080",
  "#ff8c00",
  "#ffe600",
  "#35ff69",
  "#00d9ff",
  "#7c3aed",
];

export function RoyGBivit({
  children,
  colors = DEFAULT_COLORS,
  duration = 1.4,
  bowFlow = "ltr",
  active = true,
  className,
  ...props
}) {
  const chars = [...String(children)];

  const refs = useRef([]);

  const animations = useRef([]);

  useEffect(() => {
    animations.current.forEach((animation) => animation.cancel());

    animations.current = [];

    refs.current.forEach((node) => {
      node?.style.removeProperty("color");
    });

    if (!active || !colors.length || !chars.length) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      refs.current.forEach((node, index) => {
        if (!node) {
          return;
        }

        node.style.color = colors[index % colors.length];
      });

      return;
    }

    const frames = [...colors, colors[0]].map((color) => ({
      color,
    }));

    const durationMs = duration * 1000;

    const phase = durationMs / chars.length;

    refs.current.forEach((node, index) => {
      if (!node) {
        return;
      }

      const position = bowFlow === "ltr" ? index : chars.length - index - 1;

      const animation = node.animate(frames, {
        duration: durationMs,

        iterations: Infinity,

        easing: "linear",

        delay: -(position * phase),
      });

      animations.current.push(animation);
    });

    return () => {
      animations.current.forEach((animation) => animation.cancel());

      animations.current = [];
    };
  }, [children, colors.join("|"), duration, bowFlow, active]);

  return (
    <span className={className} {...props}>
      <span aria-hidden="true">
        {chars.map((char, index) => {
          if (/\s/.test(char)) {
            return char;
          }

          return (
            <span
              key={index}
              ref={(node) => {
                refs.current[index] = node;
              }}
              style={{
                display: "inline-block",

                willChange: "color",
              }}
            >
              {char}
            </span>
          );
        })}
      </span>

      <span style={visuallyHidden}>{children}</span>
    </span>
  );
}

const visuallyHidden = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
};
