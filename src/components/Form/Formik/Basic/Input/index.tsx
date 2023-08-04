import React from "react";
import { ConditionRecord } from "@/common/type/base";
import { FieldProps } from "formik";
import { FaTimesCircle } from "react-icons/fa";
import { NoteMessage } from "@/components/UI";

export interface InputProps extends FieldProps {
  rootClass?: string;
  style?: React.CSSProperties;
  label?: string;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  required?: boolean;
  disabled?: boolean;
  prefix?: React.ReactNode | React.ReactNode[];
  suffix?: React.ReactNode | React.ReactNode[];
}

const Input: React.ForwardRefRenderFunction<HTMLDivElement, InputProps> = (
  {
    form,
    field,
    rootClass = "",
    style,
    label,
    placeholder = "Type in...",
    size = "md",
    required,
    disabled,
    prefix,
    suffix,
  },
  ref
) => {
  const { name, value } = field;

  const { touched, errors, setFieldValue } = form;

  const isError = React.useMemo(
    () => touched[name] && errors[name],
    [touched, errors, name]
  );

  const sizeClass = React.useMemo(() => {
    const sizes: ConditionRecord = {
      sm: "input-sm",
      md: "input-md",
      lg: "input-lg",
    };
    return sizes[size];
  }, [size]);

  const onClearInput = () => setFieldValue(name, "");

  return (
    <div
      ref={ref}
      style={style}
      className={`input ${sizeClass} ${rootClass}`}
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
              {...field}
              type="text"
              className="control-action"
              disabled={disabled}
              placeholder={placeholder}
            />

            {value && (
              <div className="control-clear-icon" onClick={onClearInput}>
                <FaTimesCircle size={12} />
              </div>
            )}
          </div>

          {suffix && <div className="group-suffix">{suffix}</div>}
        </div>
      </label>

      {isError && (
        <NoteMessage
          message={errors[name] as string}
          type="error"
          textStyle="italic"
        />
      )}
    </div>
  );
};

export default React.forwardRef(Input);
