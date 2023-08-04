import React from "react";
import Button, { ButtonProps } from "../Button";
import useRender from "@/common/hooks/useRender";

export interface ModalProps {
  rootClass?: string;
  headerClass?: string;
  bodyClass?: string;
  footerClass?: string;
  open?: boolean;
  hasFooter?: boolean;
  style?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  footerStyle?: React.CSSProperties;
  header?: string | React.ReactNode;
  children?: string | React.ReactNode;
  okButtonText?: string;
  okButtonProps?: ButtonProps;
  cancelButtonText?: string;
  cancelButtonProps?: ButtonProps;
  size?: "sm" | "md" | "lg" | "xl";
  onOk?: () => void;
  onCancel?: () => void;
}

const Modal: React.ForwardRefRenderFunction<HTMLDivElement, ModalProps> = (
  {
    rootClass = "",
    headerClass = "",
    bodyClass = "",
    footerClass = "",
    open,
    hasFooter = true,
    style,
    headerStyle,
    bodyStyle,
    footerStyle,
    header = "Modal header",
    children,
    size = "md",
    okButtonText = "Ok",
    okButtonProps = { variant: "info" },
    cancelButtonText = "Cancel",
    cancelButtonProps = { style: { marginRight: "10px" } },
    onOk,
    onCancel,
  },
  ref
) => {
  const isRender = useRender(Boolean(open));

  const sizeClass = React.useMemo(() => {
    const sizes: any = {
      sm: "modal-sm",
      md: "modal-md",
      lg: "modal-lg",
      xl: "modal-xl",
    };

    return sizes[size];
  }, [size]);

  const backdropActiveClass = React.useMemo(
    () => (open ? "modal-backdrop-active" : ""),
    [open]
  );

  const modalActiveClass = React.useMemo(
    () => (open ? "modal-active" : ""),
    [open]
  );
  return (
    <React.Fragment>
      {/* Backdrop */}
      {isRender && (
        <div
          className={`modal-backdrop ${backdropActiveClass}`}
          onClick={onCancel}
        ></div>
      )}

      {isRender && (
        <div
          ref={ref}
          style={style}
          className={`modal ${modalActiveClass} ${sizeClass()} ${rootClass}`}
        >
          {/* Header */}
          <div style={headerStyle} className={`modal-header ${headerClass}`}>
            {header}
          </div>

          {/* Body */}
          <div style={bodyStyle} className={`modal-body ${bodyClass}`}>
            {children}
          </div>

          {/* Footer */}
          {hasFooter && (
            <div style={footerStyle} className={`modal-footer ${footerClass}`}>
              <Button {...cancelButtonProps} onClick={onCancel}>
                {cancelButtonText}
              </Button>
              <Button {...okButtonProps} onClick={onOk}>
                {okButtonText}
              </Button>
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default React.forwardRef(Modal);
