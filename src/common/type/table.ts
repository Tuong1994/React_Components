export interface TableColumn<T> {
  id: string;
  title: string;
  dataIndex: keyof T;
  render?: (data: any, record: T) => React.ReactNode;
}

export type Columns<Record = unknown> = TableColumn<Record>[];
