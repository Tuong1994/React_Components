import React from "react";
import { FaAngleDown } from "react-icons/fa";

interface SelectTagcControlProps {
  isError: boolean;
  disabled: boolean;
  prefix: React.ReactNode;
  placeholder: string;
  getRegisterFn: () => any;
  getOnBlurFn: () => any;
  getOnChangeFn: () => any;
  onDropdown: () => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  renderValue: () => string | undefined;
}

const SelectTagcControl: React.FC<SelectTagcControlProps> = ({
  isError,
  disabled,
  prefix,
  placeholder,
  onFocus,
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
          placeholder={placeholder}
          disabled={disabled}
          value={renderValue()}
          onFocus={onFocus}
          onBlur={getOnBlurFn()}
          onChange={getOnChangeFn()}
        />
      </div>

      <div className="group-suffix group-suffix-cursor">
        <FaAngleDown />
      </div>
    </div>
  );
};

export default SelectTagcControl;
