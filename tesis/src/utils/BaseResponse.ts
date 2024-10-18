export interface BaseResponse<T> {
  data: T;
  error?: {
    message: string;
  };
}

export interface Paginator<T> {
  data: T;
  totalPages: number;
  currentPage: number;
}
