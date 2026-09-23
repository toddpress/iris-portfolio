import { useState } from "react";

import { Enchanted } from "./Enchanted";

import { RoyGBivit } from "./RoyGBivit";

import { Exploji } from "./Exploji";

const DEFAULT_COLORS = [
  "#ff0080",
  "#ff8c00",
  "#ffe600",
  "#35ff69",
  "#00d9ff",
  "#7c3aed",
];

const DEFAULT_EMOJIS = ["✨", "⭐", "💫", "☄️", "🪐", "🛰️"];

export function IridescentText({
  children,

  colors = DEFAULT_COLORS,

  emojis = DEFAULT_EMOJIS,

  duration = 1.1,

  bowFlow = "ltr",

  hover = true,

  rainbow = {},

  explosion = {},

  onMouseEnter,

  onMouseLeave,

  ...props
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Enchanted
      {...props}
      onMouseEnter={(event) => {
        setHovered(true);

        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        setHovered(false);

        onMouseLeave?.(event);
      }}
    >
      <RoyGBivit
        colors={colors}
        duration={duration}
        bowFlow={bowFlow}
        active={hover ? hovered : true}
        {...rainbow}
      >
        {children}
      </RoyGBivit>

      <Exploji
        emojis={emojis}
        count={32}
        speed={[250, 500]}
        gravity={100}
        bounce={0.68}
        lifetime={[3200, 4500]}
        fadeAt={0.75}
        collision
        {...explosion}
      />
    </Enchanted>
  );
}
