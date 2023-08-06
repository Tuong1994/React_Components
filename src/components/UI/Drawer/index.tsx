import React from "react";
import { ConditionRecord } from "@/common/type/base";
import { FaTimes } from "react-icons/fa";
import useRender from "@/common/hooks/useRender";
import useOverflow from "@/common/hooks/useOverflow";

interface DrawerProps {
  open?: boolean;
  rootClass?: string;
  headerClass?: string;
  bodyClass?: string;
  style?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  hasHeader?: boolean;
  header?: string | React.ReactNode | React.ReactNode[];
  children?: string | React.ReactNode | React.ReactNode[];
  theme?: "light" | "dark";
  onClose?: () => void;
}

const Drawer: React.ForwardRefRenderFunction<HTMLDivElement, DrawerProps> = (
  {
    rootClass = "",
    headerClass = "",
    bodyClass = "",
    style,
    headerStyle,
    bodyStyle,
    children,
    theme = "light",
    header = "Drawer header",
    hasHeader = true,
    open = false,
    onClose,
  },
  ref
) => {
  const render = useRender(open);

  useOverflow(open);

  const themeClass = React.useMemo(() => {
    const themes: ConditionRecord = {
      light: "drawer-container-light",
      dark: "drawer-container-dark",
    };

    return themes[theme];
  }, [theme]);

  return render ? (
    <React.Fragment>
      <div
        className={`drawer-backdrop ${open ? "drawer-backdrop-active" : ""}`}
        onClick={onClose}
      ></div>

      <div
        ref={ref}
        style={style}
        className={`drawer-container ${
          open ? "drawer-container-active" : ""
        } ${themeClass} ${rootClass}`}
      >
        {hasHeader && (
          <div
            style={headerStyle}
            className={`container-header ${headerClass}`}
          >
            <div className="header-content">{header}</div>

            <button type="button" className="header-icon" onClick={onClose}>
              <FaTimes size={18} />
            </button>
          </div>
        )}

        <div
          style={bodyStyle}
          className={`container-body ${
            !hasHeader ? "container-body-height" : ""
          } ${bodyClass}`}
        >
          {children}
        </div>
      </div>
    </React.Fragment>
  ) : null;
};

export default React.forwardRef(Drawer);
