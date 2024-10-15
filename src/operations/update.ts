import { BulkOperationResult } from "payload/dist/collections/config/types";
import type { DeepPartial } from "ts-essentials";

import { HttpClient } from "@/lib/httpClient";
import { ByIDOptions, GeneratedTypes, ManyOptions } from "@/types";

export type UpdateByIDOptions<
  TSlug extends keyof GeneratedTypes["collections"],
> = ByIDOptions<TSlug> & {
  data: DeepPartial<GeneratedTypes["collections"][TSlug]>;
};

export type UpdateOptions<TSlug extends keyof GeneratedTypes["collections"]> =
  ManyOptions<TSlug> & {
    data: DeepPartial<GeneratedTypes["collections"][TSlug]>;
  };

const update = <TSlug extends keyof GeneratedTypes["collections"]>(
  client: HttpClient,
  options: UpdateOptions<TSlug>
): Promise<BulkOperationResult<TSlug>> => {
  const { collection, data, ...rest } = options;
  return client.put(collection as string, {
    body: data,
    query: rest,
  });
};

const updateByID = <TSlug extends keyof GeneratedTypes["collections"]>(
  client: HttpClient,
  options: UpdateByIDOptions<TSlug>
): Promise<GeneratedTypes["collections"][TSlug]> => {
  const { collection, id, data, ...rest } = options;
  return client.put(`${collection as string}/${id}`, {
    body: data,
    query: rest,
  });
};

export { update, updateByID };
