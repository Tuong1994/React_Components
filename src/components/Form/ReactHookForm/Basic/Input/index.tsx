import React from "react";
import { ConditionRecord } from "@/common/type/base";
import { FaTimesCircle } from "react-icons/fa";
import { FormItemContext } from "../../Item";
import { useFormContext } from "react-hook-form";

export interface InputProps {
  rootClass?: string;
  style?: React.CSSProperties;
  size?: "sm" | "md" | "lg";
  variant?: "success" | "warning" | "info";
  label?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (text: string) => void;
}

const Input: React.ForwardRefRenderFunction<HTMLDivElement, InputProps> = (
  {
    rootClass = "",
    style,
    size = "md",
    variant = "info",
    label,
    required,
    disabled,
    prefix,
    suffix,
    value = "",
    placeholder = "Type in...",
    onBlur,
    onFocus,
    onChange,
  },
  ref
) => {
  const methods = useFormContext();

  const { fieldName, fieldValue, isError, ctrlOnChange, ctrlOnBlur } =
    React.useContext(FormItemContext);

  const [inputValue, setInputValue] = React.useState<string>(value);

  const sizeClass = React.useMemo(() => {
    const sizes: ConditionRecord = {
      sm: "input-sm",
      md: "input-md",
      lg: "input-lg",
    };
    return sizes[size];
  }, [size]);

  const variantClass = React.useMemo(() => {
    const variants: ConditionRecord = {
      success: "input-success",
      warning: "input-warning",
      info: "input-info",
    };
    return variants[variant];
  }, [variant]);

  const renderValue = React.useCallback(() => {
    if (fieldValue) return fieldValue;
    if (inputValue) return inputValue;
    return "";
  }, [fieldValue, inputValue]);

  const onClearInput = () => {
    if (fieldName) return methods?.resetField(fieldName);
    setInputValue("");
    onChange && onChange("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange && onChange(e.target.value);
  };

  const getOnBlurFn = React.useCallback(
    () => (ctrlOnBlur ? ctrlOnBlur : onBlur),
    [ctrlOnBlur]
  );

  const getOnChangeFn = React.useCallback(
    () => (ctrlOnChange ? ctrlOnChange : handleChange),
    [ctrlOnChange]
  );

  return (
    <div
      ref={ref}
      style={style}
      className={`input ${variantClass} ${sizeClass} ${rootClass}`}
    >
      <label>
        <div className="input-label">
          <span className="label-name">{label}</span>
          {required && <div className="label-required">*</div>}
        </div>
        <div
          className={`input-group ${isError ? "input-group-error" : ""} ${
            disabled ? "control-disabled" : ""
          }`}
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
              onBlur={getOnBlurFn()}
              onChange={getOnChangeFn()}
            />

            {renderValue() && (
              <div className="control-clear-icon" onClick={onClearInput}>
                <FaTimesCircle size={12} />
              </div>
            )}
          </div>

          {suffix && <div className="group-suffix">{suffix}</div>}
        </div>
      </label>
    </div>
  );
};

export default React.forwardRef(Input);
