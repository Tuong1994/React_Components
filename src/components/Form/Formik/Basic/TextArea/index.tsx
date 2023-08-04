import React from "react";
import { FieldProps } from "formik";
import { ConditionRecord } from "@/common/type/base";
import { FaTimesCircle } from "react-icons/fa";
import { NoteMessage } from "@/components/UI";

export interface TextAreaProps extends FieldProps {
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
}

const TextArea: React.ForwardRefRenderFunction<
  HTMLDivElement,
  TextAreaProps
> = (
  {
    form,
    field,
    style,
    label,
    required,
    disabled,
    rows = 5,
    cols = 10,
    size = "md",
    rootClass = "",
    placeholder = "Type in...",
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
      sm: "input-textarea-sm",
      md: "input-textarea-md",
      lg: "input-textarea-lg",
    };
    return sizes[size];
  }, [size]);

  const onClearInput = () => setFieldValue(name, "");

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
            {...field}
            disabled={disabled}
            rows={rows}
            cols={cols}
            placeholder={placeholder}
            className="group-control"
          />

          {value && (
            <div className="group-clear-icon" onClick={onClearInput}>
              <FaTimesCircle size={12} />
            </div>
          )}
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

export default React.forwardRef(TextArea);
