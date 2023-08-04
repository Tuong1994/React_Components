import React from "react";
import { GridContext } from "./Context";
import { ConditionRecord } from "@/common/type/base";

export interface GridRowProps {
  rootClass?: string;
  style?: React.CSSProperties;
  children?: string | React.ReactNode | React.ReactNode[];
  gutters?: [number?, number?];
  justify?: "start" | "center" | "end" | "between" | "even" | "around";
  align?: "start" | "center" | "end" | "baseline";
}

const GridRow: React.ForwardRefRenderFunction<HTMLDivElement, GridRowProps> = (
  {
    rootClass = "",
    style,
    children,
    gutters = [],
    justify = "start",
    align = "start",
  },
  ref
) => {
  const justifyClass = React.useMemo(() => {
    const justifies: ConditionRecord = {
      start: "row-justify-start",
      center: "row-justify-center",
      end: "row-justify-end",
      between: "row-justify-between",
      even: "row-justify-even",
      around: "row-justify-around",
    };
    return justifies[justify];
  }, [justify]);

  const alignClass = React.useMemo(() => {
    const aligns: ConditionRecord = {
      start: "row-align-start",
      center: "row-align-center",
      end: "row-align-end",
      baseline: "row-align-baseline",
    };
    return aligns[align];
  }, [align]);

  const inlineStyle = React.useMemo(() => {
    if (!gutters.length) return { ...style, gap: "10px" };

    if (gutters.length === 1) return { ...style, gap: `${gutters[0]}px` };

    if (gutters.length === 2)
      return {
        ...style,
        rowGap: `${gutters[0]}px`,
        columnGap: `${gutters[1]}px`,
      };
  }, [style, gutters]);

  return (
    <GridContext.Provider value={{ gutters }}>
      <div
        ref={ref}
        style={inlineStyle}
        className={`row ${justifyClass} ${alignClass} ${rootClass}`}
      >
        {children}
      </div>
    </GridContext.Provider>
  );
};

export default React.forwardRef(GridRow);
