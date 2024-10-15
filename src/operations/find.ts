import { PaginatedDocs } from "payload/dist/database/types";

import { HttpClient } from "@/lib/httpClient";
import { ByIDOptions, GeneratedTypes, ManyOptions } from "@/types";

export type FindOptions<T extends keyof GeneratedTypes["collections"]> =
  ManyOptions<T> & {
    limit?: number;
    page?: number;
    pagination?: boolean;
    sort?: string;
  };

export type FindByIdOptions<T extends keyof GeneratedTypes["collections"]> =
  ByIDOptions<T>;

/**
 * @description Find documents with criteria
 * @param options
 * @returns documents satisfying query
 */
export const find = async <T extends keyof GeneratedTypes["collections"]>(
  client: HttpClient,
  options: FindOptions<T>
): Promise<PaginatedDocs<GeneratedTypes["collections"][T]>> => {
  const { collection, ...rest } = options;

  return client.get(`${collection as string}`, {
    query: rest,
    nextConfig: {
      tags: ["payload"],
    },
  });
};

export const findByID = <T extends keyof GeneratedTypes["collections"]>(
  client: HttpClient,
  options: FindByIdOptions<T>
): Promise<GeneratedTypes["collections"][T]> => {
  const { collection, id, ...rest } = options;
  const url = `${collection as string}/${id}`;
  return client.get(url, {
    query: rest,
    nextConfig: {
      tags: ["payload"],
    },
  });
};
