import React from "react";

interface TableBodyCellCheckBoxProps {
  rowKey: React.Key;
  isRowChecked: (key: React.Key) => boolean;
  onSelectRow: (key: React.Key) => void;
}

const TableBodyCellCheckBox: React.FC<TableBodyCellCheckBoxProps> = ({
  rowKey,
  isRowChecked,
  onSelectRow,
}) => {
  return (
    <td>
      <div className="table-cell">
        <input
          type="checkbox"
          className="cell-checkbox"
          checked={isRowChecked(rowKey)}
          onChange={() => onSelectRow(rowKey)}
        />
      </div>
    </td>
  );
};

export default TableBodyCellCheckBox;
