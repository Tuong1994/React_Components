import React from "react";
import { ConditionRecord } from "@/common/type/base";

export interface SpaceProps {
  rootClass?: string;
  style?: React.CSSProperties;
  size?: "sm" | "md" | "lg" | number;
  justify?: "start" | "center" | "end";
  align?: "start" | "center" | "end";
  children?: string | React.ReactNode | React.ReactNode[];
}

const Space: React.ForwardRefRenderFunction<HTMLDivElement, SpaceProps> = (
  {
    rootClass = "",
    style,
    size = "sm",
    justify = "start",
    align = "start",
    children,
  },
  ref
) => {
  const justifyClass = React.useMemo(() => {
    const justifies: ConditionRecord = {
      start: "space-justify-start",
      center: "space-justify-center",
      end: "space-justify-end",
    };
    return justifies[justify];
  }, [justify]);

  const alignClass = React.useMemo(() => {
    const aligns: ConditionRecord = {
      start: "space-align-start",
      center: "space-align-center",
      end: "space-align-end",
    };
    return aligns[align];
  }, [align]);

  const sizeClass = React.useMemo(() => {
    const sizes: ConditionRecord = {
      sm: "space-child-sm",
      md: "space-child-md",
      lg: "space-child-lg",
    };
    return sizes[size] ?? "";
  }, [size]);

  const sizeStyle = React.useCallback(
    (idx: number) => {
      if (typeof size !== "number") return {};
      if (idx === React.Children.count(children) - 1)
        return { marginRight: `0px` };
      return { marginRight: `${size}px` };
    },
    [size]
  );

  return (
    <div
      ref={ref}
      style={style}
      className={`space ${justifyClass} ${alignClass} ${rootClass}`}
    >
      {React.Children.map(children, (child, idx) => (
        <div style={sizeStyle(idx)} className={`space-child ${sizeClass}`}>
          {child}
        </div>
      ))}
    </div>
  );
};

export default React.forwardRef(Space);
