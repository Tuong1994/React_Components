import React from "react";
import { FaCheck } from "react-icons/fa";
import { ConditionRecord } from "@/common/type/base";

interface CommonProps {
  rootClass?: string;
  children?: string | React.ReactNode;
  style?: React.CSSProperties;
}

interface ListProps {
  titleClass?: string;
  theme?: "dark" | "light";
  title?: string | React.ReactNode;
}

interface ListItemProps {
  icon?: React.ReactNode;
}

export type UlProps = CommonProps & ListProps;

export type LiProps = CommonProps & ListItemProps;

export const List: React.FC<CommonProps & ListProps> = React.forwardRef(
  (
    { rootClass = "", titleClass = "", theme = "dark", style, children, title },
    ref: React.ForwardedRef<HTMLUListElement>
  ) => {
    const themeClass = React.useMemo(() => {
      const themes: ConditionRecord = {
        dark: "list-dark",
        light: "list-light",
      };

      return themes[theme];
    }, [theme]);

    return (
      <ul ref={ref} style={style} className={`list ${themeClass} ${rootClass}`}>
        <p className={`list-title ${titleClass}`}>{title}</p>
        {children}
      </ul>
    );
  }
);

export const ListItem: React.FC<CommonProps & ListItemProps> = React.forwardRef(
  (
    { rootClass = "", style, children, icon },
    ref: React.ForwardedRef<HTMLLIElement>
  ) => {
    return (
      <li ref={ref} style={style} className={`list-item ${rootClass}`}>
        {icon ? icon : <FaCheck />}
        <span className="item-content">{children}</span>
      </li>
    );
  }
);
