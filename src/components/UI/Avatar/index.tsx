import React from "react";
import { FaUser } from "react-icons/fa";
import { ConditionRecord } from "@/common/type/base";

export interface AvatarProps {
  rootClass?: string;
  size?: number;
  style?: React.CSSProperties;
  children?: string | React.ReactNode;
  badgeContent?: string;
  dot?: boolean;
  color?: "red" | "blue" | "green" | "orange" | "none";
  shape?: "square" | "circle";
}

const Avatar: React.ForwardRefRenderFunction<HTMLDivElement, AvatarProps> = (
  {
    rootClass = "",
    color = "none",
    shape = "circle",
    children = <FaUser />,
    size = 40,
    style,
    dot,
    badgeContent,
  },
  ref
) => {
  const shapeClass = React.useMemo(() => {
    const shapes: ConditionRecord = {
      square: "avatar-child-square",
      circle: "avatar-child-circle",
    };

    return shapes[shape];
  }, [shape]);

  const colorClass = React.useMemo(() => {
    const colors: ConditionRecord = {
      red: "avatar-child-red",
      blue: "avatar-child-blue",
      green: "avatar-child-green",
      orange: "avatar-child-orange",
    };

    return colors[color];
  }, [color]);

  return (
    <div ref={ref} className={`avatar ${rootClass}`}>
      {badgeContent && !dot && (
        <div
          className={`avatar-badge ${
            badgeContent.length > 0 ? "avatar-badge-radius" : ""
          }`}
        >
          {badgeContent}
        </div>
      )}

      {!badgeContent && dot && <div className="avatar-dot"></div>}

      <div
        style={{ ...style, width: `${size}px`, height: `${size}px` }}
        className={`avatar-child ${shapeClass} ${colorClass}`}
      >
        {children}
      </div>
    </div>
  );
};

export default React.forwardRef(Avatar);
