interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  align: string;
  title: string;
  record: Item;
  index: number;
  children: React.ReactNode;
}
interface DataTableMonth {
  thang1?: number;
  thang2?: number;
  thang3?: number;
  thang4?: number;
  thang5?: number;
  thang6?: number;
  thang7?: number;
  thang8?: number;
  thang9?: number;
  thang10?: number;
  thang11?: number;
  thang12?: number;
  thunhap?: number;
  key: string;
}
