export interface IPagination {
  externalCurrentPage?: number;
  perPage?: number;
  total: number;
  handlePagination: (paginationInfo: IPaginationInfo) => void;
}

export interface IPaginationInfo {
  perPage: number;
  currentPage: number;
}
