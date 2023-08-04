import React from "react";
import { FaAngleDown, FaTimesCircle } from "react-icons/fa";

interface SelectBasicControlProps {
  isError: boolean;
  disabled: boolean;
  prefix: React.ReactNode;
  placeholder: string;
  getRegisterFn: () => any;
  getOnBlurFn: () => any;
  getOnChangeFn: () => any;
  onClearInput: () => void;
  onDropdown: () => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  renderValue: () => string | undefined;
}

const SelectBasicControl: React.FC<SelectBasicControlProps> = ({
  isError,
  disabled,
  prefix,
  placeholder,
  onFocus,
  onClearInput,
  onDropdown,
  getRegisterFn,
  getOnBlurFn,
  getOnChangeFn,
  renderValue,
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
          {...getRegisterFn()}
          type="text"
          className="control-action"
          disabled={disabled}
          placeholder={placeholder}
          value={renderValue()}
          onFocus={onFocus}
          onBlur={getOnBlurFn()}
          onChange={getOnChangeFn()}
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

export default SelectBasicControl;
