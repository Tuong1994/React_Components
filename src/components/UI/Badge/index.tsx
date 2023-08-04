import { ConditionRecord } from "@/common/type/base";
import React from "react";

export interface BadgeProps {
  rootClass?: string;
  style?: React.CSSProperties;
  children?: string | React.ReactNode | React.ReactNode[];
  ghost?: boolean;
  variant?: "default" | "info" | "success" | "danger" | "warning";
}

const Badge: React.ForwardRefRenderFunction<HTMLDivElement, BadgeProps> = (
  { rootClass = "", style, children = "Badge", variant = "default", ghost },
  ref
) => {
  const variantClass = React.useMemo(() => {
    const variants: ConditionRecord = {
      info: `badge-info ${ghost ? "badge-info-ghost" : ""}`,
      success: `badge-success ${ghost ? "badge-success-ghost" : ""}`,
      danger: `badge-danger ${ghost ? "badge-danger-ghost" : ""}`,
      warning: `badge-warning ${ghost ? "badge-warning-ghost" : ""}`,
    };
    return variants[variant];
  }, [variant]);

  return (
    <div
      ref={ref}
      style={style}
      className={`badge ${variantClass} ${rootClass}`}
    >
      {children}
    </div>
  );
};

export default React.forwardRef(Badge);
