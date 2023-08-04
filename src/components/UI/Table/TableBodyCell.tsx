import { TableColumn } from "@/common/type/table";

interface TableBodyCellProps<M> {
  data: M;
  column: TableColumn<M>;
}

const TableBodyCell = <M extends object>({
  data,
  column,
}: TableBodyCellProps<M>) => {
  return (
    <td>
      <div className="table-cell">
        {column.render
          ? (column.render(data[column.dataIndex], data) as React.ReactNode)
          : (data[column.dataIndex] as React.ReactNode)}
      </div>
    </td>
  );
};

export default TableBodyCell;
