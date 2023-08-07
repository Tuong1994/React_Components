import React from "react";
import { SelectOption } from "@/common/type/form";
import { ConditionRecord } from "@/common/type/base";
import { FieldProps } from "formik";
import { NoteMessage } from "@/components/UI";
import SelectAsyncOptions from "./Options";
import SelectAsyncControl from "./Control";
import useRender from "@/common/hooks/useRender";
import useClickOutside from "@/common/hooks/useClickOutside";
import useDetectBottom from "@/common/hooks/useDetectBottom";

export interface SelectAsyncProps extends FieldProps {
  rootClass?: string;
  style?: React.CSSProperties;
  size?: "sm" | "md" | "lg";
  variant?: "success" | "warning" | "info";
  label?: string;
  placeholder?: string;
  required?: boolean;
  loading?: boolean;
  disabled?: boolean;
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
    form,
    field,
    rootClass = "",
    style,
    size = "md",
    variant = "info",
    label,
    prefix,
    required,
    disabled = false,
    loading = false,
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
  const { name } = field;

  const { touched, errors, setFieldValue } = form;

  const [searchValue, setSearchValue] = React.useState<string>("");

  const [selectValue, setSelectValue] = React.useState<SelectOption | null>(
    null
  );

  const [isDropdown, setIsDropdown] = React.useState<boolean>(false);

  const [page, setPage] = React.useState<number>(1);

  const selectRef = React.useRef<HTMLDivElement | null>(null);

  const render = useRender(isDropdown);

  const isBottom = useDetectBottom(selectRef);

  useClickOutside(selectRef, setIsDropdown);

  const totalPage = React.useMemo(
    () => Math.ceil(total / limit),
    [total, limit]
  );

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

  const variantClass = React.useMemo(() => {
    const variants: ConditionRecord = {
      success: "input-select-success",
      warning: "input-select-warning",
      info: "input-select-info",
    };
    return variants[variant];
  }, [variant]);

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

  const handleChangePage = (type: "prev" | "next") => {
    let currentPage = page;
    if (type === "prev") currentPage -= 1;
    else currentPage += 1;
    setPage(currentPage);
    onChangePage && onChangePage(currentPage);
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
        className={`input-select ${variantClass} ${sizeClass} ${rootClass}`}
      >
        <label className="select-label">
          <span className="label-name">{label}</span>
          {required && <div className="label-required">*</div>}
        </label>

        <div className="select-wrapper">
          <SelectAsyncControl
            isError={isError}
            disabled={disabled}
            prefix={prefix}
            placeholder={placeholder}
            renderValue={renderValue}
            onClearInput={onClearInput}
            onDropdown={onDropdown}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={handleChange}
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

export default React.forwardRef(SelectAsync);
