import React from "react";
import { SelectOption } from "@/common/type/form";
import { FaTimes } from "react-icons/fa";

interface SelectTagListProps {
  selectValue: SelectOption[];
  handleRemoveTag: (value: string | number) => void;
}

const SelectTagList: React.FC<SelectTagListProps> = ({
  selectValue,
  handleRemoveTag,
}) => {
  return (
    <div className="select-tags">
      {selectValue.map((item, idx) => (
        <div className="tags-item" key={idx}>
          <span className="item-name">{item.label}</span>
          <FaTimes
            size={11}
            className="item-icon"
            onClick={() => handleRemoveTag(item.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default SelectTagList;
