import React from "react";
import { SelectOption } from "@/common/type/form";
import { FaCheck } from "react-icons/fa";
import Spinner from "@/components/UI/Loading/Spinner";

interface SelectTagOptionItemProps {
  options: SelectOption[];
  selectValue: SelectOption[];
  loading: boolean;
  handleSelect: (op: SelectOption) => void;
}

const SelectTagOptionItem: React.FC<SelectTagOptionItemProps> = ({
  options,
  loading,
  selectValue,
  handleSelect,
}) => {
  const isSelected = React.useCallback(
    (value: string | number) =>
      selectValue.findIndex((item) => item.value === value) > -1,
    [selectValue]
  );

  return (
    <React.Fragment>
      {options && options.length > 0 ? (
        !loading ? (
          <React.Fragment>
            {options.map((op, idx) => (
              <div
                key={idx}
                className={`group-item group-item-tag ${
                  isSelected(op.value)
                    ? "group-item-selected group-item-tag-selected"
                    : ""
                }`}
                onClick={() => handleSelect(op)}
              >
                <span className="item-name">{op.label}</span>
                {isSelected(op.value) && <FaCheck size={12} />}
              </div>
            ))}
          </React.Fragment>
        ) : (
          <div className="group-loading">
            <Spinner />
          </div>
        )
      ) : (
        <div className="group-item-empty">No options</div>
      )}
    </React.Fragment>
  );
};

export default SelectTagOptionItem;
