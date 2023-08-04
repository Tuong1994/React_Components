import React from "react";
import { ConditionRecord } from "@/common/type/base";

export interface ParagraphProps {
  rootClass?: string;
  theme?: "dark" | "light";
  align?: "left" | "right" | "center" | "justify";
  weight?: "thin" | "regular" | "semiBold" | "bold";
  children?: string | React.ReactNode;
  size?: number;
  style?: React.CSSProperties;
}

const Paragraph: React.ForwardRefRenderFunction<
  HTMLParagraphElement,
  ParagraphProps
> = (
  {
    rootClass = "",
    theme = "dark",
    align = "left",
    weight = "thin",
    size = 14,
    children,
    style,
  },
  ref
) => {
  const themeClass = React.useMemo(() => {
    const themes: ConditionRecord = {
      dark: "paragraph-dark",
      light: "paragraph-light",
    };

    return themes[theme];
  }, [theme]);

  const alignClass = React.useMemo(() => {
    const aligns: ConditionRecord = {
      left: "paragraph-left",
      right: "paragraph-right",
      center: "paragraph-center",
      justify: "paragraph-justify",
    };

    return aligns[align];
  }, [align]);

  const weightClass = React.useMemo(() => {
    const weights: ConditionRecord = {
      thin: "paragraph-thin",
      regular: "paragraph-regular",
      semiBold: "paragraph-semiBold",
      bold: "paragraph-bold",
    };

    return weights[weight];
  }, [weight]);

  const inlineStyle = React.useMemo(() => {
    return { ...style, fontSize: `${size}px` };
  }, [size]);

  return (
    <p
      ref={ref}
      style={inlineStyle}
      className={`paragraph ${themeClass} ${alignClass} ${weightClass} ${rootClass}`}
    >
      {children}
    </p>
  );
};

export default React.forwardRef(Paragraph);
