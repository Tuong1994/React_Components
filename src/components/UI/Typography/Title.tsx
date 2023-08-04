import React from "react";
import { ConditionRecord } from "@/common/type/base";

export interface TitleProps {
  rootClass?: string;
  children?: string | React.ReactNode;
  style?: React.CSSProperties;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  theme?: "dark" | "light";
}

const Title: React.ForwardRefRenderFunction<HTMLHeadingElement, TitleProps> = (
  { rootClass = "", theme = "dark", children, level, style },
  ref
) => {
  const themeClass = React.useMemo(() => {
    const themes: ConditionRecord = {
      dark: "title-dark",
      light: "title-light",
    };

    return themes[theme];
  }, [theme]);

  const commonProps = {
    ref,
    style,
    className: `title title-level-${level} ${themeClass} ${rootClass}`,
  };

  return (
    <React.Fragment>
      {level === 1 && <h1 {...commonProps}>{children}</h1>}
      {level === 2 && <h2 {...commonProps}>{children}</h2>}
      {level === 3 && <h3 {...commonProps}>{children}</h3>}
      {level === 4 && <h4 {...commonProps}>{children}</h4>}
      {level === 5 && <h5 {...commonProps}>{children}</h5>}
      {level === 6 && <h6 {...commonProps}>{children}</h6>}
    </React.Fragment>
  );
};

export default React.forwardRef(Title);
