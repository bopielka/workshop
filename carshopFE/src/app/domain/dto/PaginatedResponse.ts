export interface PaginatedResponse<T> {
    pageNumber: number;
    pageSize: number;
    totalRecordCount: number;
    recordsPerPage: number;
    resources: T[];
}
