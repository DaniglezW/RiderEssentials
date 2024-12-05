import { Product } from "../../../model/product";

export interface PageProductResponse {
  content: Product[];
  pageable: {
        sort: {
            empty: boolean,
            unsorted: boolean,
            sorted: boolean
        },
        offset: number,
        pageSize: number,
        pageNumber: number,
        paged: boolean,
        unpaged: boolean
    },
    last: boolean,
    totalElements: number,
    totalPages: number,
    size: number,
    number: number,
    sort: {
        empty: boolean,
        unsorted: boolean,
        sorted: boolean
    },
    numberOfElements: number,
    first: boolean,
    empty: boolean
}