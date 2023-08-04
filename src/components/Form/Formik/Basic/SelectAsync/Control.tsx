import React from "react";
import { FaAngleDown, FaTimesCircle } from "react-icons/fa";

interface SelectAsyncControlProps {
  isError: boolean;
  disabled: boolean;
  prefix: React.ReactNode;
  placeholder: string;
  renderValue: () => string | undefined;
  onClearInput: () => void;
  onDropdown: () => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SelectAsyncControl: React.FC<SelectAsyncControlProps> = ({
  isError,
  disabled,
  prefix,
  placeholder,
  renderValue,
  onClearInput,
  onDropdown,
  onFocus,
  onBlur,
  onChange,
}) => {
  return (
    <div
      className={`select-group ${isError ? "select-group-error" : ""} ${
        disabled ? "control-disabled" : ""
      }`}
      onClick={onDropdown}
    >
      {prefix && <div className="group-prefix">{prefix}</div>}

      <div className="group-control">
        <input
          type="text"
          className="control-action"
          disabled={disabled}
          placeholder={placeholder}
          value={renderValue()}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
        />

        {renderValue() && (
          <div className="control-clear-icon" onClick={onClearInput}>
            <FaTimesCircle size={12} />
          </div>
        )}
      </div>

      <div className="group-suffix group-suffix-cursor">
        <FaAngleDown />
      </div>
    </div>
  );
};

export default SelectAsyncControl;
