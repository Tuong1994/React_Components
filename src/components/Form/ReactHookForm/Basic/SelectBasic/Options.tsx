import React from "react";
import { FaCheck } from "react-icons/fa";
import { SelectOption } from "@/common/type/form";

interface SelectBasicOptionsProps {
  isDropdown: boolean;
  isBottom: boolean;
  selectValue: SelectOption | null;
  options: SelectOption[];
  handleSelect: (op: SelectOption) => void;
}

const SelectBasicOptions: React.FC<SelectBasicOptionsProps> = ({
  options,
  selectValue,
  isDropdown,
  isBottom,
  handleSelect,
}) => {
  return (
    <div
      className={`select-option ${
        isBottom ? "select-option-bottom" : ""
      } ${isDropdown ? "select-option-active" : ""}`}
    >
      <div
        className={`option-group ${
          options.length > 10 ? "option-group-scroll" : ""
        }`}
      >
        {options && options.length > 0 ? (
          options.map((op, idx) => (
            <div
              key={idx}
              className={`group-item ${
                selectValue?.value === op.value ? "group-item-selected" : ""
              } `}
              onClick={() => handleSelect(op)}
            >
              <span className="item-name">{op.label}</span>
              {selectValue?.value === op.value && <FaCheck size={12} />}
            </div>
          ))
        ) : (
          <div className="group-item-empty">No options</div>
        )}
      </div>
    </div>
  );
};

export default SelectBasicOptions;
