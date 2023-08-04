import React from "react";
import { Columns } from "@/common/type/table";
import TableHeadCell from "./TableHeadCell";
import TableBodyRow from "./TableBodyRow";

export interface TableProps<M, E> {
  dataSource: M[];
  columns: Columns<M>;
  expandDataSource?: E[];
  expandColumns?: Columns<E>;
  rowKey?: React.Key;
  hasExpand?: boolean;
  hasSelection?: boolean;
  rootClass?: string;
  style?: React.CSSProperties;
  onRowSelect?: (keys: React.Key[]) => void;
}

const Table = <M extends object, E = unknown>(
  {
    rootClass = "",
    rowKey = "id",
    style,
    dataSource,
    columns,
    expandDataSource = [],
    expandColumns = [],
    hasExpand = false,
    hasSelection = false,
    onRowSelect,
  }: TableProps<M, E>,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  const [rowSelectedKeys, setRowSelectedKeys] = React.useState<React.Key[]>([]);

  // Handle select a row
  const onSelectRow = (id: React.Key) => {
    const keys = [...rowSelectedKeys];

    const idx = keys.indexOf(id);

    if (idx !== -1) keys.splice(idx, 1);
    else keys.push(id);

    onRowSelect && onRowSelect(keys);

    setRowSelectedKeys(keys);
  };

  // Handle select all rows
  const onSelectAllRows = () => {
    let keys = [...rowSelectedKeys];

    if (keys.length === dataSource.length) keys = [];
    else
      dataSource.map((d) => {
        if (!keys.includes(d[rowKey as keyof M] as React.Key))
          keys.push(d[rowKey as keyof M] as React.Key);
      });

    onRowSelect && onRowSelect(keys);

    setRowSelectedKeys(keys);
  };

  // Checked row
  const isRowChecked = React.useCallback(
    (id: React.Key) => {
      return [...rowSelectedKeys].includes(id);
    },
    [rowSelectedKeys]
  );

  const renderCellCheckBox = React.useCallback(() => {
    if (
      rowSelectedKeys.length > 0 &&
      rowSelectedKeys.length < dataSource.length
    )
      return (
        <div className="cell-checkbox-mixed" onClick={onSelectAllRows}></div>
      );
    else if (
      rowSelectedKeys.length === 0 ||
      rowSelectedKeys.length === dataSource.length
    )
      return (
        <input
          type="checkbox"
          className="cell-checkbox"
          checked={rowSelectedKeys.length === dataSource.length}
          onChange={onSelectAllRows}
        />
      );
  }, [rowSelectedKeys]);

  return (
    <div ref={ref} style={style} className={`table-container ${rootClass}`}>
      <table>
        <thead>
          <tr>
            <TableHeadCell<M>
              hasExpand={hasExpand}
              hasSelection={hasSelection}
              columns={columns}
              renderCellCheckBox={renderCellCheckBox}
            />
          </tr>
        </thead>

        <tbody>
          {dataSource.map((data) => {
            const dataKey = data[rowKey as keyof M] as React.Key;

            return (
              <TableBodyRow<M, E>
                key={dataKey}
                dataKey={dataKey}
                rowKey={rowKey}
                hasExpand={hasExpand}
                hasSelection={hasSelection}
                data={data}
                columns={columns}
                expandDataSource={expandDataSource}
                expandColumns={expandColumns}
                isRowChecked={isRowChecked}
                onSelectRow={onSelectRow}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default React.forwardRef(Table);
