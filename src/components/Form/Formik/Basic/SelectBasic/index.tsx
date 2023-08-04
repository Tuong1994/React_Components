import React from "react";
import { SelectOption } from "@/common/type/form";
import { ConditionRecord } from "@/common/type/base";
import SelectBasicOptions from "./Options";
import SelectBasicControl from "./Control";
import useRender from "@/common/hooks/useRender";
import useClickOutside from "@/common/hooks/useClickOutside";
import useDetectBottom from "@/common/hooks/useDetectBottom";
import { FieldProps } from "formik";
import { NoteMessage } from "@/components/UI";

export interface SelectBasicProps extends FieldProps {
  rootClass?: string;
  style?: React.CSSProperties;
  size?: "sm" | "md" | "lg";
  label?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  prefix?: React.ReactNode;
  options?: SelectOption[];
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (op: SelectOption) => void;
}

const SelectBasic: React.ForwardRefRenderFunction<
  HTMLDivElement,
  SelectBasicProps
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
    value = "",
    placeholder = "Search...",
    options = [],
    onBlur,
    onFocus,
    onChange,
  },
  ref
) => {
  const { name } = field;

  const { touched, errors, setFieldValue } = form;

  const [searchValue, setSearchValue] = React.useState<string>(value);

  const [selectValue, setSelectValue] = React.useState<SelectOption | null>(
    null
  );

  const [isDropdown, setIsDropdown] = React.useState<boolean>(false);

  const selectRef = React.useRef<HTMLDivElement | null>(null);

  const render = useRender(isDropdown);

  const isBottom = useDetectBottom(selectRef);

  useClickOutside(selectRef, setIsDropdown);

  const isError = React.useMemo(
    () => (touched[name] && errors[name]) as boolean,
    [touched, errors, name]
  );

  const sizeClass = React.useMemo(() => {
    const sizes: ConditionRecord = {
      sm: "input-select-sm",
      md: "input-select-md",
      lg: "input-select-lg",
    };
    return sizes[size];
  }, [size]);

  const renderValue = React.useCallback(() => {
    if (searchValue) return searchValue;
    if (selectValue) return selectValue.label;
    return "";
  }, [selectValue, searchValue]);

  const onDropdown = () => setIsDropdown(!isDropdown);

  const onClearInput = () => {
    setSelectValue(null);
    setSearchValue("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setSelectValue(null);
  };

  const handleSelect = (op: SelectOption) => {
    setSelectValue(op);
    setSearchValue("");
    setFieldValue(name, op.value);
    onChange && onChange(op);
  };

  const filterOptions = () => {
    if (searchValue)
      return options.filter((op) =>
        op.label.toLowerCase().includes(searchValue.toLowerCase())
      );

    return options;
  };

  return (
    <div ref={ref}>
      <div
        ref={selectRef}
        style={style}
        className={`input-select ${sizeClass} ${rootClass}`}
      >
        <label className="select-label">
          <span className="label-name">{label}</span>
          {required && <div className="label-required">*</div>}
        </label>

        <div className="select-wrapper">
          <SelectBasicControl
            isError={isError}
            disabled={disabled}
            prefix={prefix}
            placeholder={placeholder}
            renderValue={renderValue}
            onFocus={onFocus}
            onDropdown={onDropdown}
            onBlur={onBlur}
            onClearInput={onClearInput}
            onChange={handleChange}
          />

          {render && (
            <SelectBasicOptions
              options={filterOptions()}
              selectValue={selectValue}
              isDropdown={isDropdown}
              isBottom={isBottom}
              handleSelect={handleSelect}
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

export default React.forwardRef(SelectBasic);
