import React from "react";
import { SelectOption } from "@/common/type/form";
import { ConditionRecord } from "@/common/type/base";
import { FormItemContext } from "../../Item";
import { useFormContext } from "react-hook-form";
import SelectTagOptions from "./Options";
import SelectTagControl from "./Control";
import SelectTagList from "./TagList";
import useRender from "@/common/hooks/useRender";
import useClickOutside from "@/common/hooks/useClickOutside";
import useDetectBottom from "@/common/hooks/useDetectBottom";

export interface SelectTagProps {
  rootClass?: string;
  style?: React.CSSProperties;
  size?: "sm" | "md" | "lg";
  label?: string;
  value?: string;
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
  onChange?: (tags: (string | number)[]) => void;
}

const SelectTag: React.ForwardRefRenderFunction<
  HTMLDivElement,
  SelectTagProps
> = (
  {
    rootClass = "",
    style,
    size = "md",
    label,
    prefix,
    required,
    loading = false,
    disabled = false,
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

  const [selectValue, setSelectValue] = React.useState<SelectOption[]>([]);

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

  const renderValue = React.useCallback(() => {
    if (!fieldValue) {
      if (searchValue) return searchValue;
      if (selectValue && selectValue.length > 0) return "";
    } else {
      if (typeof fieldValue === "string" && selectValue.length === 0)
        return fieldValue;
      if (fieldValue && selectValue.length > 0) return fieldValue;
    }
  }, [fieldValue, selectValue, searchValue]);

  const onDropdown = () => setIsDropdown(!isDropdown);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSelect = (op: SelectOption) => {
    const items = [...selectValue];

    const idx = items.findIndex((item) => item.value === op.value);

    if (idx === -1) items.push(op);
    else items.splice(idx, 1);

    const tags = items.map((item) => item.value);

    if (fieldName) methods?.setValue(fieldName, tags);

    setSelectValue(items);

    onChange && onChange(tags);

    methods?.clearErrors(fieldName);
  };

  const handleRemoveTag = (value: string | number) => {
    const tags = [...selectValue].filter((item) => item.value !== value);
    setSelectValue(tags);
    if (fieldName) methods?.setValue(fieldName, tags);
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
        className={`input-select ${sizeClass} ${rootClass}`}
      >
        <label className="select-label">
          <span className="label-name">{label}</span>
          {required && <div className="label-required">*</div>}
        </label>

        <div className="select-tag-group">
          <SelectTagControl
            isError={isError}
            disabled={disabled}
            prefix={prefix}
            placeholder={placeholder}
            onFocus={onFocus}
            onDropdown={onDropdown}
            renderValue={renderValue}
            getRegisterFn={getRegisterFn}
            getOnBlurFn={getOnBlurFn}
            getOnChangeFn={getOnChangeFn}
          />

          {render && (
            <SelectTagOptions
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

        {selectValue.length > 0 && (
          <SelectTagList
            selectValue={selectValue}
            handleRemoveTag={handleRemoveTag}
          />
        )}
      </div>
    </div>
  );
};

export default React.forwardRef(SelectTag);
