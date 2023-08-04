import React from "react";
import { Columns } from "@/common/type/table";

interface TableHeadCellProps<M> {
  hasExpand: boolean;
  hasSelection: boolean;
  columns: Columns<M>;
  renderCellCheckBox: () => React.ReactNode;
}

const TableHeadCell = <M extends object>({
  hasExpand,
  hasSelection,
  columns,
  renderCellCheckBox,
}: TableHeadCellProps<M>) => {
  return (
    <React.Fragment>
      {hasSelection && (
        <th>
          <div className="table-cell">{renderCellCheckBox()}</div>
        </th>
      )}

      {hasExpand && <th></th>}

      {columns.map((column) => (
        <th key={column.id}>
          <div className="table-cell">{column.title}</div>
        </th>
      ))}
    </React.Fragment>
  );
};

export default TableHeadCell;
