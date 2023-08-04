import React from "react";
import { SelectOption } from "@/common/type/form";
import { FaCheck } from "react-icons/fa";
import Spinner from "@/components/UI/Loading/Spinner";

interface SelectAsyncOptionItemProps {
  options: SelectOption[];
  selectValue: SelectOption | null;
  loading: boolean;
  handleSelect: (op: SelectOption) => void;
}

const SelectAsyncOptionItem: React.FC<SelectAsyncOptionItemProps> = ({
  options,
  loading,
  selectValue,
  handleSelect,
}) => {
  return (
    <React.Fragment>
      {options && options.length > 0 ? (
        !loading ? (
          <React.Fragment>
            {options.map((op, idx) => (
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

export default SelectAsyncOptionItem;
