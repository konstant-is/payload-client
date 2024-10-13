import { GeneratedTypes } from "payload";
import { Options as FindOptions } from "payload/dist/collections/operations/local/find";
import { PaginatedDocs } from "payload/dist/database/types";
import { HttpClient } from "./lib/httpClient";

export class PayloadClient<TGeneratedTypes extends GeneratedTypes> {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  find = async <T extends keyof TGeneratedTypes["collections"]>(
    options: FindOptions<T>
  ): Promise<PaginatedDocs<TGeneratedTypes["collections"][T]>> => {
    const { collection, ...rest } = options;

    return this.client.get(collection as string, {
      query: rest,
    });
  };
}
