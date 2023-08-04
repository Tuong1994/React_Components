import React from "react";
import { TabsItem } from "@/common/type/tabs";

export interface TabsProps {
  rootClass?: string;
  titleClass?: string;
  contentClass?: string;
  style?: React.CSSProperties;
  items?: TabsItem[];
}

const Tabs: React.ForwardRefRenderFunction<HTMLDivElement, TabsProps> = (
  { rootClass = "", titleClass = "", contentClass = "", style, items = [] },
  ref
) => {
  const [tabActive, setTabActive] = React.useState<number>(0);

  const indicatorRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (indicatorRef.current !== null) {
      const width = indicatorRef.current.offsetWidth;
      indicatorRef.current.style.left = `${width * tabActive}px`;
    }
  }, [tabActive]);

  const isActive = React.useCallback(
    (idx: number) => tabActive === idx,
    [tabActive]
  );

  const handleActive = (idx: number) => setTabActive(idx);

  return (
    <div style={style} className={`tabs ${rootClass}`} ref={ref}>
      <div className={`tabs-title ${titleClass}`}>
        {items.map((item, idx) => (
          <div
            key={item.id}
            style={{ width: `calc(100% / ${items.length})` }}
            className={`title-item ${isActive(idx) ? "title-item-active" : ""}`}
            onClick={() => handleActive(idx)}
          >
            {item.titleIcon && (
              <span className="item-icon">{item.titleIcon}</span>
            )}
            <span>{item.title}</span>
          </div>
        ))}
      </div>

      <div
        ref={indicatorRef}
        style={{ width: `calc(100% / ${items.length})` }}
        className="tabs-indicator"
      ></div>

      {items.map((item, idx) => (
        <div
          key={item.id}
          className={`tabs-content ${
            isActive(idx) ? "tabs-content-active" : ""
          } ${contentClass}`}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
};

export default React.forwardRef(Tabs);
