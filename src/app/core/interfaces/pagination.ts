export interface paginationRequest {
  page: number;
  limit: number;
}

export interface ApiPaginationResponse {
  data: any[];
  hasNextPage: number;
}