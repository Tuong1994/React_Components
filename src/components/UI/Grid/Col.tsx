import React from "react";
import { ColSpan } from "@/common/type/grid";
import { GridContext } from "./Context";
import useReponsive from "@/common/hooks/useReponsive";

export interface GridColProps {
  rootClass?: string;
  style?: React.CSSProperties;
  children?: string | React.ReactNode | React.ReactNode[];
  span?: ColSpan;
  xs?: ColSpan;
  md?: ColSpan;
  lg?: ColSpan;
}

const GAP_SIZE_DEFAULT = 10;

const GridCol: React.ForwardRefRenderFunction<HTMLDivElement, GridColProps> = (
  { rootClass = "", style, children, xs, md, lg, span = 24 },
  ref
) => {
  const { gutters = [] } = React.useContext(GridContext);

  const { isPhone, isTablet, isLaptop, isDesktop } = useReponsive();

  const [colWidth, setColWidth] = React.useState<string>("100%");

  const [isHide, setIsHide] = React.useState<boolean>(false);

  const gapSize = React.useMemo(() => {
    if (!gutters.length) return GAP_SIZE_DEFAULT;

    if (gutters.length === 1) return gutters[0];
  }, [gutters]);

  const inlineStyle = React.useMemo(() => {
    return { ...style, width: colWidth };
  }, [style, colWidth]);

  const calculateWidth = (colspan: ColSpan) =>
    `calc((100% / 24) * ${colspan} - ${gapSize}px)`;

  // responsive base on screen width
  React.useEffect(() => {
    if (isDesktop) {
      if (span === 24) return setColWidth("100%");

      return setColWidth(calculateWidth(span));
    }

    if (isPhone) {
      if (xs && xs !== 24) return setColWidth(calculateWidth(xs));
    }

    if (isTablet) {
      if (md && md !== 24) return setColWidth(calculateWidth(md));
    }

    if (isLaptop) {
      if (lg && lg !== 24) return setColWidth(calculateWidth(lg));
    }

    if (xs === 24 || md === 24 || lg === 24) return setColWidth("100%");
  }, [
    span,
    xs,
    md,
    lg,
    gapSize,
    isPhone,
    isTablet,
    isLaptop,
    isDesktop,
  ]);

  // Hide col if all col span value === 0
  React.useEffect(() => {
    if (isHide) setIsHide(false);
    if (span === 0 || xs === 0 || md === 0 || lg === 0) setIsHide(true);
  }, [span, xs, md, lg]);

  return !isHide ? (
    <div ref={ref} style={inlineStyle} className={`col ${rootClass}`}>
      {children}
    </div>
  ) : null;
};

export default React.forwardRef(GridCol);
