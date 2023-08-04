import React from "react";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";

export interface PaginationProps {
  rootClass?: string;
  style?: React.CSSProperties;
  total?: number;
  limit?: number;
  siblingCount?: number;
  hasContent?: boolean;
  simple?: boolean;
  onChange?: (page: number) => void;
}

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

const DOTS = "...";

const Pagination: React.ForwardRefRenderFunction<
  HTMLDivElement,
  PaginationProps
> = (
  {
    rootClass = "",
    style,
    total = 100,
    limit = 10,
    siblingCount = 1,
    hasContent,
    simple,
    onChange,
  },
  ref
) => {
  const totalPage = Math.ceil(total / limit);

  const totalPageNumbers = siblingCount + 5;

  const [currentPage, setCurrentPage] = React.useState<number>(1);

  React.useEffect(() => onChange && onChange(currentPage), [currentPage]);

  const paginationRange = React.useMemo(() => {
    if (totalPageNumbers > totalPage) return range(1, totalPage);

    const leftSiblingIdx = Math.max(currentPage - siblingCount, 1);

    const rightSiblingIdx = Math.min(currentPage + siblingCount, totalPage);

    const isShowLeftDots = leftSiblingIdx > 2;

    const isShowRightDots = rightSiblingIdx < totalPage - 2;

    const firstPageIdx = 1;

    const lastPageIdx = totalPage;

    // Show right dots
    if (!isShowLeftDots && isShowRightDots) {
      const leftItems = 3 + 2 * siblingCount;

      const leftRange = range(1, leftItems);

      return [...leftRange, DOTS, totalPage];
    }

    // Show left dots
    if (isShowLeftDots && !isShowRightDots) {
      const rightItems = 3 + 2 * siblingCount;

      const rightRange = range(totalPage - rightItems + 1, totalPage);

      return [firstPageIdx, DOTS, ...rightRange];
    }

    // Show left / right dots
    if (isShowLeftDots && isShowRightDots) {
      const middleRange = range(leftSiblingIdx, rightSiblingIdx);

      return [firstPageIdx, DOTS, ...middleRange, DOTS, lastPageIdx];
    }

    return [];
  }, [total, limit, siblingCount, currentPage]);

  const prevBtnDisabled = React.useMemo(() => {
    if (currentPage === 1) return true;
  }, [currentPage, totalPage]);

  const nextBtnDisabled = React.useMemo(() => {
    if (currentPage === totalPage) return true;
  }, [currentPage, totalPage]);

  const renderPages = React.useCallback(() => {
    return (
      <div className="pagination-basic">
        {paginationRange.map((page, idx) => (
          <button
            key={idx}
            type="button"
            className={`action-button ${
              page === DOTS ? "action-button-dots" : ""
            } ${currentPage === page ? "action-button-active" : ""} `}
            onClick={() => {
              if (page === DOTS) return;
              handleChange("page", Number(page));
            }}
          >
            {page}
          </button>
        ))}
      </div>
    );
  }, [paginationRange]);

  const renderSimplePage = React.useCallback(() => {
    return (
      <div className="pagination-simple">
        {currentPage} / {totalPage}
      </div>
    );
  }, [currentPage, totalPage]);

  const renderContent = React.useCallback(() => {
    const start = (currentPage - 1) * limit;
    const end = start + limit;
    const from = start === 0 ? 1 : start;
    const to = end === total ? total : end;
    return `Show ${from} to ${to} of ${total} results`;
  }, [total, limit, currentPage]);

  const handleChange = (
    type: "first" | "prev" | "page" | "next" | "last",
    page = 1
  ) => {
    switch (type) {
      case "first": {
        setCurrentPage(1);
        break;
      }
      case "prev": {
        setCurrentPage((prev) => prev - 1);
        break;
      }
      case "page": {
        setCurrentPage(page);
        break;
      }
      case "next": {
        setCurrentPage((prev) => prev + 1);
        break;
      }
      case "last": {
        setCurrentPage(totalPage);
        break;
      }
    }
  };

  return (
    <div
      ref={ref}
      style={style}
      className={`pagination ${
        !hasContent ? "pagination-flex-end" : ""
      } ${rootClass}`}
    >
      {hasContent && (
        <div className="pagination-content">{renderContent()}</div>
      )}

      <div className="pagination-action">
        <button
          type="button"
          className="action-button"
          disabled={prevBtnDisabled}
          onClick={() => handleChange("first")}
        >
          <FaAngleDoubleLeft size={17} />
        </button>

        <button
          type="button"
          className="action-button"
          disabled={prevBtnDisabled}
          onClick={() => handleChange("prev")}
        >
          <FaAngleLeft size={17} />
        </button>

        {!simple ? (
          renderPages()
        ) : (
          <div className="action-simple">
            {currentPage} / {totalPage}
          </div>
        )}

        {/* Responsive page */}
        {renderSimplePage()}

        <button
          type="button"
          className="action-button"
          disabled={nextBtnDisabled}
          onClick={() => handleChange("next")}
        >
          <FaAngleRight size={17} />
        </button>

        <button
          type="button"
          className="action-button"
          disabled={nextBtnDisabled}
          onClick={() => handleChange("last")}
        >
          <FaAngleDoubleRight size={17} />
        </button>
      </div>
    </div>
  );
};

export default React.forwardRef(Pagination);
