export interface AccordionItem {
  id: string;
  title: string;
  titleIcon?: React.ReactNode | React.ReactNode[];
  content: string | React.ReactNode | React.ReactNode[];
}
