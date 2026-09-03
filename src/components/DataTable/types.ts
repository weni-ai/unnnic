export type CellAlign = 'left' | 'center' | 'right';
export type CellType = 'header' | 'body';
export type DataTableSize = 'sm' | 'md';

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
  NONE: '',
} as const;

export type SortOrder = (typeof SORT_ORDER)[keyof typeof SORT_ORDER];

export const NEXT_SORT_ORDER: Record<SortOrder, SortOrder> = {
  [SORT_ORDER.ASC]: SORT_ORDER.DESC,
  [SORT_ORDER.DESC]: SORT_ORDER.ASC,
  [SORT_ORDER.NONE]: SORT_ORDER.ASC,
};

export interface DataTableHeader {
  title: string;
  isSortable?: boolean;
  itemKey: string;
  align?: CellAlign;
  size?: number | string;
}

export interface DataTableItem {
  [key: string]: unknown;
}

export interface SortState {
  header: string;
  itemKey: string;
  order: SortOrder;
}

export interface DataTableCellProps {
  align?: CellAlign;
  size?: DataTableSize;
  sortOrder?: SortOrder;
  sortable?: boolean;
  type?: CellType;
  width?: string;
}

export interface DataTableProps {
  headers: DataTableHeader[];
  items: DataTableItem[];
  isLoading?: boolean;
  size?: DataTableSize;
  height?: string;
  maxHeight?: string;
  clickable?: boolean;
  fixedHeaders?: boolean;
  hideHeaders?: boolean;
  hidePagination?: boolean;
  page?: number;
  pageTotal?: number;
  pageInterval?: number;
  locale?: string;
  sort?: SortState;
  infiniteScroll?: boolean;
  infiniteScrollDistance?: number;
  infiniteScrollDisabled?: boolean;
  isLoadingMore?: boolean;
}
