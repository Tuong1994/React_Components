import React from "react";
import { ConditionRecord } from "@/common/type/base";

export interface SkeletonProps {
  rootClass?: string;
  paragraphLines?: number;
  type?: "line" | "image" | "avatar" | "paragraph" | "button";
}

const Skeleton: React.FC<SkeletonProps> = ({
  rootClass,
  type = "line",
  paragraphLines = 4,
}) => {
  const typeClass = React.useMemo(() => {
    const types: ConditionRecord = {
      line: "skeleton-line",
      image: "skeleton-image",
      avatar: "skeleton-avatar",
      button: "skeleton-button",
    };

    return types[type];
  }, [type]);

  return (
    <React.Fragment>
      {type !== "paragraph" && (
        <div className={`skeleton ${typeClass} ${rootClass}`}></div>
      )}

      {type === "paragraph" && (
        <React.Fragment>
          {[...Array(paragraphLines)].map((_, idx) => (
            <div
              key={idx}
              className={`skeleton skeleton-paragraph-line ${rootClass}`}
            ></div>
          ))}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Skeleton;
