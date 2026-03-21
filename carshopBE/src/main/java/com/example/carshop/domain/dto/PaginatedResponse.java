package com.example.carshop.domain.dto;

import org.springframework.data.domain.Page;

import java.util.List;

public class PaginatedResponse<T> {

    private int pageNumber;
    private int pageSize;
    private long totalRecordCount;
    private int recordsPerPage;
    private List<T> resources;

    public static <T> PaginatedResponse<T> from(Page<T> page) {
        PaginatedResponse<T> response = new PaginatedResponse<>();
        response.pageNumber = page.getNumber();
        response.pageSize = page.getSize();
        response.totalRecordCount = page.getTotalElements();
        response.recordsPerPage = page.getNumberOfElements();
        response.resources = page.getContent();
        return response;
    }

    public int getPageNumber() { return pageNumber; }
    public int getPageSize() { return pageSize; }
    public long getTotalRecordCount() { return totalRecordCount; }
    public int getRecordsPerPage() { return recordsPerPage; }
    public List<T> getResources() { return resources; }
}
