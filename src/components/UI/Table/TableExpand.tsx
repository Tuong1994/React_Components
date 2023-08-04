import React from "react";
import { Columns } from "@/common/type/table";

interface TableExpandProps<E> {
  rowKey: React.Key;
  dataSource: E[];
  colSpan: number;
  columns: Columns<E>;
}

const TableExpand = <E = unknown>({
  rowKey,
  dataSource,
  colSpan,
  columns,
}: TableExpandProps<E>) => {
  return (
    <tr>
      <td></td>
      <td colSpan={colSpan + 1}>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.id}>
                    <div className="table-cell">{column.title}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataSource.map((data) => (
                <tr key={data[rowKey as keyof E] as React.Key}>
                  {columns.map((column) => (
                    <td key={column.id}>
                      <div className="table-cell">
                        {column.render
                          ? (column.render(
                              data[column.dataIndex],
                              data
                            ) as React.ReactNode)
                          : (data[column.dataIndex] as React.ReactNode)}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </td>
    </tr>
  );
};

export default TableExpand;
