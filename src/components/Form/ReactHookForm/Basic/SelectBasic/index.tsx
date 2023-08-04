import React from "react";
import { SelectOption } from "@/common/type/form";
import { ConditionRecord } from "@/common/type/base";
import { FormItemContext } from "../../Item";
import { useFormContext } from "react-hook-form";
import SelectBasicOptions from "./Options";
import SelectBasicControl from "./Control";
import useRender from "@/common/hooks/useRender";
import useClickOutside from "@/common/hooks/useClickOutside";
import useDetectBottom from "@/common/hooks/useDetectBottom";

export interface SelectBasicProps {
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
  const methods = useFormContext();

  const { fieldName, fieldValue, isError, ctrlOnChange, ctrlOnBlur } =
    React.useContext(FormItemContext);

  const [searchValue, setSearchValue] = React.useState<string>(value);

  const [selectValue, setSelectValue] = React.useState<SelectOption | null>(
    null
  );

  const [isDropdown, setIsDropdown] = React.useState<boolean>(false);

  const selectRef = React.useRef<HTMLDivElement | null>(null);

  const render = useRender(isDropdown);

  const isBottom = useDetectBottom(selectRef);

  useClickOutside(selectRef, setIsDropdown);

  React.useEffect(() => {
    if (fieldName) methods?.trigger(fieldName);
  }, [isError, fieldName, fieldValue, methods?.register]);

  const sizeClass = React.useMemo(() => {
    const sizes: ConditionRecord = {
      sm: "input-select-sm",
      md: "input-select-md",
      lg: "input-select-lg",
    };
    return sizes[size];
  }, [size]);

  const renderValue = React.useCallback(() => {
    if (!fieldValue) {
      if (searchValue) return searchValue;
      if (selectValue) return selectValue.label;
      if (!selectValue) return "";
    } else {
      if (typeof fieldValue === "string" && !selectValue) return fieldValue;
      if (fieldValue && selectValue)
        return options.find((op) => op.value === fieldValue)?.label;
    }
  }, [fieldValue, selectValue, searchValue]);

  const onDropdown = () => setIsDropdown(!isDropdown);

  const onClearInput = () => {
    if (fieldName) methods?.resetField(fieldName);
    setSelectValue(null);
    setSearchValue("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSelect = (op: SelectOption) => {
    if (fieldName) methods?.setValue(fieldName, op.value);
    setSelectValue(op);
    onChange && onChange(op);
    methods?.clearErrors(fieldName);
  };

  const filterOptions = () => {
    const filterValue = fieldValue ? fieldValue : searchValue;

    if (filterValue && typeof filterValue === "string")
      return options.filter((op) =>
        op.label.toLowerCase().includes(filterValue.toLowerCase())
      );

    return options;
  };

  const getRegisterFn = React.useCallback(
    () => fieldName && { ...methods?.register(fieldName) },
    [fieldName]
  );

  const getOnBlurFn = React.useCallback(
    () => (ctrlOnBlur ? ctrlOnBlur : onBlur),
    [ctrlOnBlur]
  );

  const getOnChangeFn = React.useCallback(
    () => (ctrlOnChange ? ctrlOnChange : handleChange),
    [ctrlOnChange]
  );

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

        <SelectBasicControl
          isError={isError}
          disabled={disabled}
          prefix={prefix}
          placeholder={placeholder}
          onFocus={onFocus}
          onClearInput={onClearInput}
          onDropdown={onDropdown}
          renderValue={renderValue}
          getRegisterFn={getRegisterFn}
          getOnBlurFn={getOnBlurFn}
          getOnChangeFn={getOnChangeFn}
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
    </div>
  );
};

export default React.forwardRef(SelectBasic);
