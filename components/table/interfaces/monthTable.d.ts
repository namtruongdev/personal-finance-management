interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  align: string;
  title: string;
  record: Item;
  index: number;
  children: React.ReactNode;
}
