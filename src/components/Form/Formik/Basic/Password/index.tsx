import React from "react";
import { ConditionRecord } from "@/common/type/base";
import { FieldProps } from "formik";
import { FaEye, FaEyeSlash, FaTimesCircle } from "react-icons/fa";
import { NoteMessage } from "@/components/UI";

export interface InputPasswordProps extends FieldProps {
  rootClass?: string;
  style?: React.CSSProperties;
  label?: string;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  variant?: "success" | "warning" | "info";
  required?: boolean;
  disabled?: boolean;
  prefix?: React.ReactNode | React.ReactNode[];
  suffix?: React.ReactNode | React.ReactNode[];
}

const InputPassword: React.ForwardRefRenderFunction<
  HTMLDivElement,
  InputPasswordProps
> = (
  {
    form,
    field,
    rootClass = "",
    style,
    label,
    placeholder = "Type in...",
    size = "md",
    variant = "info",
    required,
    disabled,
    prefix,
  },
  ref
) => {
  const { name, value } = field;

  const { touched, errors, setFieldValue } = form;

  const isError = touched[name] && errors[name];

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

  const variantClass = React.useMemo(() => {
    const variants: ConditionRecord = {
      success: "input-password-success",
      warning: "input-password-warning",
      info: "input-password-info",
    };
    return variants[variant];
  }, [variant]);

  const onClearInput = () => setFieldValue(name, "");

  const handleSwitchType = () => {
    if (switchType === "password") setSwitchType("text");
    else setSwitchType("password");
  };

  return (
    <div
      ref={ref}
      style={style}
      className={`input-password ${variantClass} ${sizeClass} ${rootClass}`}
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
              {...field}
              type={switchType}
              disabled={disabled}
              className="control-action"
              placeholder={placeholder}
            />

            {value && (
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

export default React.forwardRef(InputPassword);
