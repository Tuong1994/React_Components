import React from "react";

export interface CardProps {
  hasHover?: boolean;
  rootClass?: string;
  headerClass?: string;
  bodyClass?: string;
  style?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  header?: string | React.ReactNode;
  children?: string | React.ReactNode;
}

const Card: React.ForwardRefRenderFunction<HTMLDivElement, CardProps> = (
  {
    style,
    headerStyle,
    bodyStyle,
    hasHover,
    rootClass = "",
    headerClass = "",
    bodyClass = "",
    header = "Card header",
    children,
  },
  ref
) => {
  const hoverClass = React.useMemo(
    () => hasHover && "card-hover",
    [hasHover]
  );

  return (
    <div
      ref={ref}
      style={style}
      className={`card ${hoverClass} ${rootClass}`}
    >
      <div style={headerStyle} className={`card-header ${headerClass}`}>
        {header}
      </div>
      <div style={bodyStyle} className={`card-body ${bodyClass}`}>
        {children}
      </div>
    </div>
  );
};

export default React.forwardRef(Card);
