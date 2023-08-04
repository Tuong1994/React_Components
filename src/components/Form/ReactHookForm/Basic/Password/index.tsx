import React from "react";
import { ConditionRecord } from "@/common/type/base";
import { FaEye, FaEyeSlash, FaTimesCircle } from "react-icons/fa";
import { FormItemContext } from "../../Item";
import { useFormContext } from "react-hook-form";

export interface InputPasswordProps {
  rootClass?: string;
  style?: React.CSSProperties;
  size?: "sm" | "md" | "lg";
  label?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  prefix?: React.ReactNode;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (text: string) => void;
}

const InputPassword: React.ForwardRefRenderFunction<
  HTMLDivElement,
  InputPasswordProps
> = (
  {
    rootClass = "",
    style,
    size = "md",
    label,
    required,
    disabled,
    prefix,
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

  const [switchType, setSwitchType] = React.useState<"text" | "password">(
    "password"
  );

  const sizeClass = React.useMemo(() => {
    const sizes: ConditionRecord = {
      sm: "input-password-sm",
      md: "input-password-md",
      lg: "input-password-lg",
    };
    return sizes[size];
  }, [size]);

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

  const handleSwitchType = () => {
    if (switchType === "password") setSwitchType("text");
    else setSwitchType("password");
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
      className={`input-password ${sizeClass} ${rootClass}`}
    >
      <label>
        <div className="password-label">
          <span className="label-name">{label}</span>
          {required && <div className="label-required">*</div>}
        </div>
        <div
          className={`password-group ${isError ? "password-group-error" : ""} ${
            disabled ? "control-disabled" : ""
          }`}
        >
          {prefix && <div className="group-prefix">{prefix}</div>}

          <div className="group-control">
            <input
              type={switchType}
              disabled={disabled}
              className="control-action"
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

          <div
            className="group-suffix group-suffix-cursor"
            onClick={handleSwitchType}
          >
            {switchType === "password" ? <FaEye /> : <FaEyeSlash />}
          </div>
        </div>
      </label>
    </div>
  );
};

export default React.forwardRef(InputPassword);
