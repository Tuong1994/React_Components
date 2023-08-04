import React from "react";
import { AccordionItem } from "@/common/type/accordion";
import { FaAngleDown, FaBoxOpen } from "react-icons/fa";

interface AccordionProps {
  rootClass?: string;
  titleClass?: string;
  contentClass?: string;
  style?: React.CSSProperties;
  item?: AccordionItem;
}

const Accordion: React.ForwardRefRenderFunction<
  HTMLDivElement,
  AccordionProps
> = (
  {
    rootClass = "",
    titleClass = "",
    contentClass = "",
    style,
    item = { title: "Accordion", titleIcon: "", content: "Content" },
  },
  ref
) => {
  const [isActive, setIsActive] = React.useState<boolean>(false);

  const handleActive = () => setIsActive(!isActive);

  return (
    <div ref={ref} style={style} className={`accordion ${rootClass}`}>
      <div className={`accordion-title ${titleClass}`} onClick={handleActive}>
        <div className="title-name">
          {item.titleIcon && (
            <span className="name-icon">
              <FaBoxOpen size={12} />
            </span>
          )}
          <span>{item.title}</span>
        </div>

        <FaAngleDown
          size={18}
          className={`title-icon ${isActive ? "title-icon-rotate" : ""}`}
        />
      </div>

      <div
        className={`accordion-content ${
          isActive ? "accordion-content-active" : ""
        } ${contentClass}`}
      >
        <div className="content-inner">{item.content}</div>
      </div>
    </div>
  );
};

export default React.forwardRef(Accordion);
