import React from "react";
import { ConditionRecord } from "@/common/type/base";

export interface SwitchProps {
  rootClass?: string;
  style?: React.CSSProperties;
  size?: "sm" | "md" | "lg";
  variant?: "success" | "danger" | "warning" | "info";
  onSwitch?: (s: boolean) => void;
}

const Switch: React.ForwardRefRenderFunction<HTMLDivElement, SwitchProps> = (
  { rootClass = "", style, size = "md", variant = "info", onSwitch },
  ref
) => {
  const [isSwitch, setIsSwitch] = React.useState<boolean>(false);

  const sizeClass = React.useMemo(() => {
    const sizes: ConditionRecord = {
      sm: "switch-sm",
      md: "switch-md",
      lg: "switch-lg",
    };

    return sizes[size];
  }, [size]);

  const variantClass = React.useMemo(() => {
    const variants: ConditionRecord = {
      success: isSwitch ? "switch-success" : "",
      danger: isSwitch ? "switch-danger" : "",
      warning: isSwitch ? "switch-warning" : "",
      info: isSwitch ? "switch-info" : "",
    };

    return variants[variant];
  }, [variant, isSwitch]);

  React.useEffect(() => onSwitch && onSwitch(isSwitch), [isSwitch]);

  const onClick = () => setIsSwitch(!isSwitch);

  return (
    <div
      ref={ref}
      style={style}
      className={`switch ${sizeClass} ${variantClass} ${rootClass}`}
      onClick={onClick}
    >
      <div
        className={`switch-dot ${isSwitch ? "switch-dot-active" : ""}`}
      ></div>
    </div>
  );
};

export default React.forwardRef(Switch);
