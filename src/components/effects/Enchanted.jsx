import { createContext, useCallback, useMemo, useState } from "react";

export const EnchantmentContext = createContext(null);

export function Enchanted({ children, ...props }) {
  const [burst, setBurst] = useState(null);

  const explodeAt = useCallback((x, y) => {
    setBurst({
      id: performance.now() + Math.random(),

      origin: {
        x,
        y,
      },
    });
  }, []);

  const value = useMemo(
    () => ({
      burst,
      explodeAt,
    }),
    [burst, explodeAt],
  );

  const { onPointerDown, ...rest } = props;

  return (
    <EnchantmentContext.Provider value={value}>
      <span
        {...rest}
        onPointerDown={(event) => {
          explodeAt(event.clientX, event.clientY);

          onPointerDown?.(event);
        }}
      >
        {children}
      </span>
    </EnchantmentContext.Provider>
  );
}
