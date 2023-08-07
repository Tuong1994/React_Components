import React from "react";
import { ConditionRecord } from "@/common/type/base";
import { FaCalendar } from "react-icons/fa";
import { FormItemContext } from "../../Item";
import { useFormContext } from "react-hook-form";
import { IDate } from "@/common/type/form";
import DatePickerCalendar from "./Calendar";
import useClickOutside from "@/common/hooks/useClickOutside";
import useDetectBottom from "@/common/hooks/useDetectBottom";
import useRender from "@/common/hooks/useRender";
import moment from "moment";

export interface DatePickerProps {
  rootClass?: string;
  style?: React.CSSProperties;
  size?: "sm" | "md" | "lg";
  variant?: "success" | "warning" | "info";
  label?: string;
  value?: Date;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  prefix?: React.ReactNode;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (d: Date) => void;
}

const DatePicker: React.ForwardRefRenderFunction<
  HTMLDivElement,
  DatePickerProps
> = (
  {
    rootClass = "",
    style,
    size = "md",
    variant = "info",
    label,
    required,
    disabled = false,
    prefix,
    value = new Date(),
    placeholder = "Select date...",
    onChange,
  },
  ref
) => {
  const methods = useFormContext();

  const { fieldName, fieldValue, isError } = React.useContext(FormItemContext);

  const [isDropdown, setIsDropdown] = React.useState<boolean>(false);

  const [selectValue, setSelectValue] = React.useState<Date>(value);

  const datepickerRef = React.useRef<HTMLDivElement | null>(null);

  const isBottom = useDetectBottom(datepickerRef);

  const render = useRender(isDropdown);

  useClickOutside(datepickerRef, setIsDropdown);

  React.useEffect(() => {
    if (fieldName) methods?.setValue(fieldName, new Date());
  }, [fieldName]);

  React.useEffect(() => {
    if (fieldName) methods?.trigger(fieldName);
  }, [isError, fieldName, fieldValue, methods?.register]);

  const sizeClass = React.useMemo(() => {
    const sizes: ConditionRecord = {
      sm: "input-datepicker-sm",
      md: "input-datepicker-md",
      lg: "input-datepicker-lg",
    };
    return sizes[size];
  }, [size]);

  const variantClass = React.useMemo(() => {
    const variants: ConditionRecord = {
      success: "input-datepicker-success",
      warning: "input-datepicker-warning",
      info: "input-datepicker-info",
    };
    return variants[variant];
  }, [variant]);

  const renderValue = React.useCallback(() => {
    if (fieldValue) return moment(fieldValue).format("DD/MM/YYYY");
    else if (selectValue) return moment(selectValue).format("DD/MM/YYYY");
    return "";
  }, [fieldValue, selectValue]);

  const onDropdown = () => setIsDropdown(!isDropdown);

  const handleChange = (d: IDate) => {
    if (fieldName) {
      methods?.setValue(fieldName, d.fullDate);
      methods?.clearErrors(fieldName);
    }
    setSelectValue(d.fullDate);
    onChange && onChange(d.fullDate);
  };

  return (
    <div ref={ref}>
      <div
        ref={datepickerRef}
        style={style}
        className={`input-datepicker ${variantClass} ${sizeClass} ${rootClass}`}
      >
        <label className="datepicker-label">
          <span className="label-name">{label}</span>
          {required && <div className="label-required">*</div>}
        </label>

        <div
          className={`datepicker-group ${
            isError ? "datepicker-group-error" : ""
          } ${disabled ? "control-disabled" : ""}`}
        >
          <div className="group-control" onClick={onDropdown}>
            {prefix && <div className="control-prefix">{prefix}</div>}

            <input
              disabled
              type="text"
              className="control-action"
              placeholder={placeholder}
              value={renderValue()}
            />

            <div className="control-suffix">
              <FaCalendar />
            </div>
          </div>

          {render && (
            <DatePickerCalendar
              isDropdown={isDropdown}
              isBottom={isBottom}
              selectValue={selectValue}
              handleChange={handleChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default React.forwardRef(DatePicker);
