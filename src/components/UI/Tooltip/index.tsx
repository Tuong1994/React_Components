import React from "react";
import { ConditionRecord } from "@/common/type/base";

export interface TooltipProps {
  rootClass?: string;
  children?: string | React.ReactNode;
  content?: string;
  placement?: "left" | "right" | "bottom" | "top";
}

const Tooltip: React.ForwardRefRenderFunction<HTMLDivElement, TooltipProps> = ({
  rootClass = "",
  children,
  content,
  placement = "bottom",
}, ref) => {
  const placementClass = React.useMemo(() => {
    const placements: ConditionRecord = {
      left: "tooltip-left",
      right: "tooltip-right",
      top: "tooltip-top",
      bottom: "tooltip-bottom",
    };

    return placements[placement];
  }, [placement]);

  return (
    <div ref={ref} className={`tooltip ${placementClass} ${rootClass}`}>
      <div className="tooltip-title">
        <span>{children}</span>
        {content && <span className="title-arrow"></span>}
      </div>

      {content && <div className="tooltip-content">{content}</div>}
    </div>
  );
};

export default React.forwardRef(Tooltip);
