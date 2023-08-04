import React from "react";
import { ConditionRecord } from "@/common/type/base";
import { FaTimesCircle } from "react-icons/fa";
import { FormItemContext } from "../../Item";
import { useFormContext } from "react-hook-form";

export interface TextAreaProps {
  rootClass?: string;
  style?: React.CSSProperties;
  size?: "sm" | "md" | "lg";
  rows?: number;
  cols?: number;
  label?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onChange?: (text: string) => void;
}

const TextArea: React.ForwardRefRenderFunction<
  HTMLDivElement,
  TextAreaProps
> = (
  {
    style,
    label,
    required,
    disabled,
    rows = 5,
    cols = 10,
    value = "",
    size = "md",
    rootClass = "",
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
      sm: "input-textarea-sm",
      md: "input-textarea-md",
      lg: "input-textarea-lg",
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
      className={`input-textarea ${sizeClass} ${rootClass}`}
    >
      <label>
        <div className="textarea-label">
          <span className="label-name">{label}</span>
          {required && <div className="label-required">*</div>}
        </div>
        <div
          className={`textarea-group ${isError ? "textarea-group-error" : ""} ${
            disabled ? "control-disabled" : ""
          }`}
        >
          <textarea
            className="group-control"
            rows={rows}
            cols={cols}
            disabled={disabled}
            placeholder={placeholder}
            value={renderValue()}
            onFocus={onFocus}
            onBlur={getOnBlurFn()}
            onChange={getOnChangeFn()}
          />

          {renderValue() && (
            <div className="group-clear-icon" onClick={onClearInput}>
              <FaTimesCircle size={12} />
            </div>
          )}
        </div>
      </label>
    </div>
  );
};

export default React.forwardRef(TextArea);
