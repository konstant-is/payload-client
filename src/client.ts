import { BulkOperationResult } from "payload/dist/collections/config/types";
import { PaginatedDocs } from "payload/dist/database/types";

import { httpClient, HttpClientProps } from "@/lib/httpClient";
import * as op from "@/operations";
import { ByIDOptions, GeneratedTypes, ManyOptions } from "@/types";

type RestConfig = {
  log?: boolean;
} & HttpClientProps;

export const payloadRestClient = <TGeneratedTypes extends GeneratedTypes>(
  config: RestConfig
) => {
  const { log, url, ...props } = config;
  const client = httpClient({
    url: `${url}/api`,
    ...props,
  });

  /**
   * @description Find documents with criteria
   * @param options
   * @returns documents satisfying query
   */
  const find = async <T extends keyof TGeneratedTypes["collections"]>(
    options: op.FindOptions<T>
  ): Promise<PaginatedDocs<TGeneratedTypes["collections"][T]>> => {
    return op.find(client, options);
  };

  const findByID = <T extends keyof GeneratedTypes["collections"]>(
    options: op.FindByIdOptions<T>
  ): Promise<GeneratedTypes["collections"][T]> => {
    return op.findByID(client, options);
  };

  const count = <T extends keyof GeneratedTypes["collections"]>(
    options: op.CountOptions<T>
  ): Promise<{ totalDocs: number }> => {
    return op.count(client, options);
  };

  const create = <TSlug extends keyof GeneratedTypes["collections"]>(
    options: op.CreateOptions<TSlug>
  ): Promise<GeneratedTypes["collections"][TSlug]> => {
    return op.create(client, options);
  };

  const updateByID = <TSlug extends keyof GeneratedTypes["collections"]>(
    options: op.UpdateByIDOptions<TSlug>
  ): Promise<GeneratedTypes["collections"][TSlug]> => {
    return op.updateByID(client, options);
  };

  const update = <TSlug extends keyof GeneratedTypes["collections"]>(
    options: op.UpdateOptions<TSlug>
  ): Promise<BulkOperationResult<TSlug>> => {
    return op.update(client, options);
  };

  const deleteMany = <TSlug extends keyof GeneratedTypes["collections"]>(
    options: ManyOptions<TSlug>
  ): Promise<BulkOperationResult<TSlug>> => {
    return op.deleteMany(client, options);
  };

  const deleteByID = <TSlug extends keyof GeneratedTypes["collections"]>(
    options: ByIDOptions<TSlug>
  ): Promise<GeneratedTypes["collections"][TSlug]> => {
    return op.deleteByID(client, options);
  };

  return {
    find: find,
    findByID: findByID,
    count: count,
    create: create,
    update: update,
    updateByID: updateByID,
    delete: deleteMany,
    deleteByID: deleteByID,
  };
};
