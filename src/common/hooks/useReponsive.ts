import React from "react";
import useViewpoint from "./useViewpoint";

const useReponsive = () => {
  const width = useViewpoint();

  const isPhone = React.useMemo(() => width >= 320 && width <= 480, [width]);

  const isTablet = React.useMemo(() => width > 480 && width <= 768, [width]);

  const isLaptop = React.useMemo(() => width > 768 && width <= 1100, [width]);

  const isDesktop = React.useMemo(() => width > 1100, [width]);

  return { isPhone, isTablet, isLaptop, isDesktop };
};

export default useReponsive;
