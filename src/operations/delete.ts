import { BulkOperationResult } from "payload/dist/collections/config/types";

import { HttpClient } from "@/lib/httpClient";
import { ByIDOptions, GeneratedTypes, ManyOptions } from "@/types";

export type DeleteByIdOptions<
  TSlug extends keyof GeneratedTypes["collections"],
> = ByIDOptions<TSlug>;

export type DeleteManyOptions<
  TSlug extends keyof GeneratedTypes["collections"],
> = ManyOptions<TSlug>;

export const deleteMany = <TSlug extends keyof GeneratedTypes["collections"]>(
  client: HttpClient,
  options: DeleteManyOptions<TSlug>
): Promise<BulkOperationResult<TSlug>> => {
  const { collection, ...rest } = options;
  return client.delete(`${collection as string}`, {
    query: rest,
  });
};

export const deleteByID = <TSlug extends keyof GeneratedTypes["collections"]>(
  client: HttpClient,
  options: DeleteByIdOptions<TSlug>
): Promise<GeneratedTypes["collections"][TSlug]> => {
  const { collection, id, ...rest } = options;
  return client.delete(`${collection as string}/${id}`, {
    query: rest,
  });
};
