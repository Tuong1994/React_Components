import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Columns } from "@/common/type/table";
import TableBodyCellCheckBox from "./TableBodyCellCheckBox";
import TableBodyCell from "./TableBodyCell";
import TableExpand from "./TableExpand";

interface TableBodyRowProps<M, E> {
  rowKey: React.Key;
  dataKey: React.Key;
  hasExpand: boolean;
  hasSelection: boolean;
  data: M;
  columns: Columns<M>;
  expandDataSource: E[];
  expandColumns: Columns<E>;
  isRowChecked: (key: React.Key) => boolean;
  onSelectRow: (key: React.Key) => void;
}

const TableBodyRow = <M extends object, E = unknown>({
  dataKey,
  rowKey,
  hasExpand,
  hasSelection,
  data,
  columns,
  expandDataSource,
  expandColumns,
  isRowChecked,
  onSelectRow,
}: TableBodyRowProps<M, E>) => {
  const [isExpand, setIsExpand] = React.useState<boolean>(false);

  const onExpand = () => setIsExpand(!isExpand);

  return (
    <React.Fragment key={dataKey}>
      <tr className={isRowChecked(dataKey) ? "table-row-selected" : ""}>
        {hasSelection && (
          <TableBodyCellCheckBox
            rowKey={dataKey}
            isRowChecked={isRowChecked}
            onSelectRow={onSelectRow}
          />
        )}

        {hasExpand && (
          <td>
            <div className="table-cell" onClick={onExpand}>
              {!isExpand ? (
                <FaPlus size={12} className="cell-expand-icon" />
              ) : (
                <FaMinus size={12} className="cell-expand-icon" />
              )}
            </div>
          </td>
        )}

        {columns.map((column) => (
          <TableBodyCell<M> key={column.id} data={data} column={column} />
        ))}
      </tr>

      {hasExpand && isExpand && (
        <TableExpand<E>
          rowKey={rowKey}
          colSpan={columns.length}
          dataSource={expandDataSource}
          columns={expandColumns}
        />
      )}
    </React.Fragment>
  );
};

export default TableBodyRow;
