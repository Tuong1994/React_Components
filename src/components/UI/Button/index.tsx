import React from "react";
import { Spinner } from "../Loading";
import { ConditionRecord } from "@/common/type/base";

export interface ButtonProps {
  children?: string | React.ReactNode;
  rootClass?: string;
  ghost?: boolean;
  disabled?: boolean;
  loading?: boolean;
  style?: React.CSSProperties;
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  variant?: "default" | "info" | "success" | "warning" | "danger";
  onClick?: () => void;
}

const Button: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  {
    children,
    ghost,
    disabled,
    loading,
    style,
    rootClass = "",
    variant = "default",
    size = "md",
    type = "button",
    onClick,
  },
  ref
) => {
  const sizeClass = React.useMemo(() => {
    const sizes: ConditionRecord = {
      sm: "button-sm",
      md: "button-md",
      lg: "button-lg",
    };

    return sizes[size] ?? "";
  }, [size]);

  const variantClass = React.useMemo(() => {
    const variants: ConditionRecord = {
      info: `button-info ${ghost && "button-info-ghost"}`,
      success: `button-success ${ghost && "button-success-ghost"}`,
      warning: `button-warning ${ghost && "button-warning-ghost"}`,
      danger: `button-danger ${ghost && "button-danger-ghost"}`,
    };

    return variants[variant] ?? "";
  }, [variant]);

  const disabledClass = React.useMemo(
    () => (disabled ? "button-disabled" : ""),
    [disabled]
  );

  return (
    <button
      ref={ref}
      type={type}
      style={style}
      disabled={disabled}
      className={`button ${variantClass} ${sizeClass} ${rootClass} ${disabledClass}`}
      onClick={onClick}
    >
      {loading && (
        <Spinner
          size={10}
          theme={variant !== "default" ? "light" : "dark"}
          style={{ marginRight: "5px" }}
        />
      )}
      <span>{children}</span>
    </button>
  );
};

export default React.forwardRef(Button);
