import React from "react";
import { ConditionRecord } from "@/common/type/base";
import { FaCalendar } from "react-icons/fa";
import { IDate } from "@/common/type/form";
import { FieldProps } from "formik";
import DatePickerCalendar from "./Calendar";
import NoteMessage from "@/components/UI/NoteMessage";
import useClickOutside from "@/common/hooks/useClickOutside";
import useDetectBottom from "@/common/hooks/useDetectBottom";
import useRender from "@/common/hooks/useRender";
import moment from "moment";

export interface DatePickerProps extends FieldProps {
  rootClass?: string;
  style?: React.CSSProperties;
  size?: "sm" | "md" | "lg";
  label?: string;
  value?: Date;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  prefix?: React.ReactNode;
}

const DatePicker: React.ForwardRefRenderFunction<
  HTMLDivElement,
  DatePickerProps
> = (
  {
    form,
    field,
    rootClass = "",
    style,
    size = "md",
    label,
    required,
    disabled = false,
    prefix,
    value = new Date(),
    placeholder = "Select date...",
  },
  ref
) => {
  const { touched, errors, setFieldValue } = form;

  const { name } = field;

  const [isDropdown, setIsDropdown] = React.useState<boolean>(false);

  const [selectValue, setSelectValue] = React.useState<Date>(value);

  const datepickerRef = React.useRef<HTMLDivElement | null>(null);

  const isBottom = useDetectBottom(datepickerRef);

  const render = useRender(isDropdown);

  useClickOutside(datepickerRef, setIsDropdown);

  React.useEffect(() => {
    setFieldValue(name, new Date());
  }, []);

  const isError = React.useMemo(
    () => touched[name] && errors[name],
    [touched, errors]
  );

  const sizeClass = React.useMemo(() => {
    const sizes: ConditionRecord = {
      sm: "input-datepicker-sm",
      md: "input-datepicker-md",
      lg: "input-datepicker-lg",
    };
    return sizes[size];
  }, [size]);

  const renderValue = React.useCallback(() => {
    if (selectValue) return moment(selectValue).format("DD/MM/YYYY");
    return "";
  }, [selectValue]);

  const onDropdown = () => setIsDropdown(!isDropdown);

  const handleChange = (d: IDate) => {
    setSelectValue(d.fullDate);
    setFieldValue(name, d.fullDate);
  };

  return (
    <div ref={ref}>
      <div
        ref={datepickerRef}
        style={style}
        className={`input-datepicker ${sizeClass} ${rootClass}`}
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
              {...field}
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

        {isError && (
          <NoteMessage
            message={errors[name] as string}
            type="error"
            textStyle="italic"
          />
        )}
      </div>
    </div>
  );
};

export default React.forwardRef(DatePicker);
