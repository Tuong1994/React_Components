export interface TabsItem {
  id: string;
  title: string | React.ReactNode | React.ReactNode[];
  titleIcon?: React.ReactNode | React.ReactNode[];
  content: string | React.ReactNode | React.ReactNode[];
}
