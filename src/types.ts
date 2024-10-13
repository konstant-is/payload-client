// import { PayloadcConfig } from "./lib/payloadTypes";

// export type Collections = Config["collections"];
// export type Globals = Config["globals"];

export type PayloadClientSettings = {
  locale?: string;
  fallbackLocale?: string;
  defaultDepth?: number;
};

export type PayloadCreateResponse<T> = {
  message: string;
  doc: T;
};

/// The find endpoint supports the following additional query parameters:
/// sort - sort by field
/// where - pass a where query to constrain returned documents
/// limit - limit the returned documents to a certain number
/// page - get a specific page of documents
export type FindQueryParams<T> = {
  sort?: string;
  where?: { [key in keyof T]?: any };
  limit?: number;
  page?: number;
};

export type PayloadQueryParams<T> = {
  depth?: number;
  locale?: string;
  draft?: boolean;
} & FindQueryParams<T>;

export type QueryParams<T> = PayloadQueryParams<T> & { [key: string]: any };

// export type RequestProps<T extends keyof Collections> = {
//   query?: QueryParams<Collections[T]>;
// };

export type Response<T extends any> = {
  data?: T;
  error: any;
};

export type PayloadResponse = {
  errors?: { message: string }[];
  message?: string;
  [key: string]: any; // Allow any additional properties
};

export interface Paged<T> {
  docs: T[]; // Array of documents in the collection
  totalDocs: number; // Total available documents within the collection
  limit: number; // Limit query parameter - defaults to 10
  totalPages: number; //Total pages available, based upon the limit queried for
  page: number; //	Current page number
  pagingCounter: number; //	number of the first doc on the current page
  hasPrevPage: boolean; // if previous page exists
  hasNextPage: boolean; // if next page exists
  prevPage: number; //number of previous page, null if it doesn't exist
  nextPage: number; //number of next page, null if it doesn't exist
}
