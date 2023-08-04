import React from "react";
import { FaStar } from "react-icons/fa";
import { RateItem } from "@/common/type/rate";
import Tooltip from "../Tooltip";

export interface RateProps {
  rootClass?: string;
  style?: React.CSSProperties;
  size?: number;
  hasContent?: boolean;
  onSelectRate?: (rate: RateItem | null) => void;
}

const Rate: React.ForwardRefRenderFunction<HTMLDivElement, RateProps> = (
  { rootClass = "", style, size = 25, hasContent, onSelectRate },
  ref
) => {
  const [point, setPoint] = React.useState<number>(0);

  const [hoverIdx, setHoverIdx] = React.useState<number>(0);

  const items = React.useMemo<RateItem[]>(
    () => [
      { id: "1", point: 1, content: "Terrible" },
      { id: "2", point: 2, content: "Bad" },
      { id: "3", point: 3, content: "Normal" },
      { id: "4", point: 4, content: "Good" },
      { id: "5", point: 5, content: "Wonderful" },
    ],
    []
  );

  const activeClass = React.useCallback(
    (p: number) => {
      if (p <= (hoverIdx || point)) return "item-icon-active";
      return "";
    },
    [point, hoverIdx]
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) {
      setPoint(0);
      setHoverIdx(0);
      onSelectRate && onSelectRate(null);
    }
  };

  const onSelect = (rate: RateItem) => {
    setPoint(rate.point);
    onSelectRate && onSelectRate(rate);
  };

  return (
    <div ref={ref} style={style} className={`rate ${rootClass}`}>
      {items.map((item) => (
        <Tooltip
          key={item.id}
          placement="top"
          rootClass="rate-item"
          content={hasContent ? item.content : ""}
        >
          <label>
            <input
              type="checkbox"
              className="item-control"
              checked={item.point === point}
              onChange={onChange}
              onClick={() => onSelect(item)}
            />
            <FaStar
              size={size}
              className={`item-icon ${activeClass(item.point)}`}
              onMouseEnter={() => setHoverIdx(item.point)}
              onMouseLeave={() => setHoverIdx(0)}
            />
          </label>
        </Tooltip>
      ))}
    </div>
  );
};

export default React.forwardRef(Rate);
