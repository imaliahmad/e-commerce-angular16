import { FilterOptions } from "./filter-options";

export interface QueryFilters{
    pageNumber: number;
    pageSize: number;
    searchText: string;
    filterOptions: FilterOptions[];
}