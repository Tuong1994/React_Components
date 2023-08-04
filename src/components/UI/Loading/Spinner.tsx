import React from "react";
import { ConditionRecord } from "@/common/type/base";

export interface SpinnerProps {
  rootClass?: string;
  style?: React.CSSProperties;
  size?: number;
  theme?: "dark" | "light";
}

const Spinner: React.FC<SpinnerProps> = ({
  rootClass = "",
  style,
  size = 20,
  theme = "dark",
}) => {
  const themeClass = React.useMemo(() => {
    const themes: ConditionRecord = {
      dark: "spinner-dark",
      light: "spinner-light",
    };

    return themes[theme];
  }, [theme]);

  return (
    <div
      style={{ ...style, width: `${size}px`, height: `${size}px` }}
      className={`spinner ${themeClass} ${rootClass}`}
    ></div>
  );
};

export default Spinner;
