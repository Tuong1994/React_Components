import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { SelectOption } from "@/common/type/form";
import SelectAsyncOptionItem from "./Item";

interface SelectAsyncOptionsProps {
  isDropdown: boolean;
  isBottom: boolean;
  loading: boolean;
  page: number;
  totalPage: number;
  selectValue: SelectOption | null;
  options: SelectOption[];
  handleSelect: (op: SelectOption) => void;
  handleChangePage: (type: "prev" | "next") => void;
}

const SelectAsyncOptions: React.FC<SelectAsyncOptionsProps> = ({
  page,
  totalPage,
  options,
  loading,
  selectValue,
  isDropdown,
  isBottom,
  handleSelect,
  handleChangePage,
}) => {
  return (
    <div
      className={`select-option ${isBottom ? "select-option-bottom" : ""}  ${
        isDropdown ? "select-option-active" : ""
      }`}
    >
      <div
        className={`option-group ${
          options.length >= 10 ? "option-group-scroll" : ""
        }`}
      >
        <SelectAsyncOptionItem
          options={options}
          loading={loading}
          selectValue={selectValue}
          handleSelect={handleSelect}
        />
      </div>

      {totalPage > 1 && (
        <div className="option-pagination">
          <div className="pagination-content">
            {page} / {totalPage}
          </div>

          <div className="pagination-actions">
            <button
              className={`actions-btn ${
                page === 1 || loading ? "actions-btn-disabled" : ""
              }`}
              disabled={page === 1 || loading}
              onClick={() => handleChangePage("prev")}
            >
              <FaAngleLeft />
            </button>
            <button
              className={`actions-btn ${
                page === totalPage || loading ? "actions-btn-disabled" : ""
              }`}
              disabled={page === totalPage || loading}
              onClick={() => handleChangePage("next")}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectAsyncOptions;
