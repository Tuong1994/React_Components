import React from "react";
import { ConditionRecord } from "@/common/type/base";

export interface DividerProps {
  rootClass?: string;
  contentClass?: string;
  style?: React.CSSProperties;
  children?: string | React.ReactNode;
  type?: "horizontal" | "vertical";
  contentPlacement?: "left" | "center" | "right";
}

const Divider: React.ForwardRefRenderFunction<HTMLDivElement, DividerProps> = (
  {
    rootClass = "",
    contentClass = "",
    style,
    children,
    type = "horizontal",
    contentPlacement = "center",
  },
  ref
) => {
  const typeClass = React.useMemo(() => {
    const types: ConditionRecord = {
      horizontal: "divider-horizontal",
      vertical: "divider-vertical",
    };

    return types[type];
  }, [type]);

  const placementClass = React.useMemo(() => {
    const placements: ConditionRecord = {
      center: "divider-content-center",
      left:
        type === "horizontal" ? "divider-content-left" : "divider-content-top",
      right:
        type === "horizontal"
          ? "divider-content-right"
          : "divider-content-bottom",
    };

    return placements[contentPlacement];
  }, [type, contentPlacement]);

  return (
    <div
      ref={ref}
      style={style}
      className={`divider ${typeClass} ${rootClass}`}
    >
      {children && (
        <div className={`divider-content ${placementClass} ${contentClass}`}>
          {children}
        </div>
      )}
    </div>
  );
};

export default React.forwardRef(Divider);
