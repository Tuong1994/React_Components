import React from "react";
import { ConditionRecord } from "@/common/type/base";
import { DropdownItem } from "@/common/type/dropdown";
import useClickOutside from "@/common/hooks/useClickOutside";

export interface DropdownProps {
  rootClass?: string;
  children?: string | React.ReactNode;
  items?: DropdownItem[];
  placement?: "bottomLeft" | "bottomRight";
  trigger?: "click" | "hover";
}

const Dropdown: React.ForwardRefRenderFunction<
  HTMLDivElement,
  DropdownProps
> = (
  {
    rootClass = "",
    children,
    items,
    placement = "bottomLeft",
    trigger = "hover",
  },
  ref
) => {
  const [isDropdown, setIsDropdown] = React.useState<boolean>(false);

  const dropdownRef = React.useRef<HTMLDivElement | null>(null);

  useClickOutside(dropdownRef, setIsDropdown);

  const placementClass = React.useMemo(() => {
    const placements: ConditionRecord = {
      bottomLeft: "dropdown-bottom-left",
      bottomRight: "dropdown-bottom-right",
    };

    return placements[placement];
  }, [placement]);

  const hoverClass = React.useMemo(
    () => (trigger === "hover" ? "dropdown-hover" : ""),
    [trigger]
  );

  const activeClass = React.useMemo(
    () => (isDropdown ? "dropdown-active" : ""),
    [isDropdown]
  );

  const onDropdown = () => {
    if (trigger === "hover") return;
    setIsDropdown(!isDropdown);
  };

  return (
    <div ref={ref}>
      <div
        ref={dropdownRef}
        className={`dropdown ${placementClass} ${hoverClass} ${activeClass} ${rootClass}`}
      >
        <div className="dropdown-title" onClick={onDropdown}>
          <span>{children}</span>
          {items && <span className="title-arrow"></span>}
        </div>

        {items && (
          <div className="dropdown-content">
            {items.map((item) => (
              <div className="content-item" key={item.id}>
                {item.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
