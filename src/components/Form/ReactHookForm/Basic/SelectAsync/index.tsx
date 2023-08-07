import React from "react";
import { SelectOption } from "@/common/type/form";
import { ConditionRecord } from "@/common/type/base";
import { FormItemContext } from "../../Item";
import { useFormContext } from "react-hook-form";
import SelectAsyncOptions from "./Options";
import SelectAsyncControl from "./Control";
import useRender from "@/common/hooks/useRender";
import useClickOutside from "@/common/hooks/useClickOutside";
import useDetectBottom from "@/common/hooks/useDetectBottom";

export interface SelectAsyncProps {
  rootClass?: string;
  style?: React.CSSProperties;
  size?: "sm" | "md" | "lg";
  variant?: "success" | "warning" | "info";
  label?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  loading?: boolean;
  total?: number;
  limit?: number;
  prefix?: React.ReactNode;
  options?: SelectOption[];
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChangePage?: (p: number) => void;
  onChange?: (op: SelectOption) => void;
}

const SelectAsync: React.ForwardRefRenderFunction<
  HTMLDivElement,
  SelectAsyncProps
> = (
  {
    rootClass = "",
    style,
    size = "md",
    variant = "info",
    label,
    required,
    disabled = false,
    loading = false,
    prefix,
    value = "",
    placeholder = "Search...",
    total = 10,
    limit = 10,
    options = [],
    onBlur,
    onFocus,
    onChange,
    onChangePage,
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

  const [page, setPage] = React.useState<number>(1);

  const selectRef = React.useRef<HTMLDivElement | null>(null);

  const render = useRender(isDropdown);

  const isBottom = useDetectBottom(selectRef);

  useClickOutside(selectRef, setIsDropdown);

  React.useEffect(() => {
    if (fieldName) methods?.trigger(fieldName);
  }, [isError, fieldName, fieldValue, methods?.register]);

  const totalPage = React.useMemo(
    () => Math.ceil(total / limit),
    [total, limit]
  );

  const sizeClass = React.useMemo(() => {
    const sizes: ConditionRecord = {
      sm: "input-select-sm",
      md: "input-select-md",
      lg: "input-select-lg",
    };
    return sizes[size];
  }, [size]);

  const variantClass = React.useMemo(() => {
    const variants: ConditionRecord = {
      success: "input-select-success",
      warning: "input-select-warning",
      info: "input-select-info",
    };
    return variants[variant];
  }, [variant]);

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

  const handleChangePage = (type: "prev" | "next") => {
    let currentPage = page;
    if (type === "prev") currentPage -= 1;
    else currentPage += 1;
    setPage(currentPage);
    onChangePage && onChangePage(currentPage);
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
        className={`input-select ${variantClass} ${sizeClass} ${rootClass}`}
      >
        <label className="select-label">
          <span className="label-name">{label}</span>
          {required && <div className="label-required">*</div>}
        </label>

        <SelectAsyncControl
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
          <SelectAsyncOptions
            options={filterOptions()}
            page={page}
            totalPage={totalPage}
            selectValue={selectValue}
            isDropdown={isDropdown}
            isBottom={isBottom}
            loading={loading}
            handleSelect={handleSelect}
            handleChangePage={handleChangePage}
          />
        )}
      </div>
    </div>
  );
};

export default React.forwardRef(SelectAsync);
