import { GeneratedTypes } from "payload";
import { Options as FindOptions } from "payload/dist/collections/operations/local/find";
import { PaginatedDocs } from "payload/dist/database/types";
import { httpClient, HttpClient, HttpClientProps } from "@/lib/httpClient";

export class PayloadClient<TGeneratedTypes extends GeneratedTypes> {
  private client: HttpClient;

  constructor(props: HttpClientProps) {
    const { url, ...rest } = props;
    this.client = httpClient({
      url: `${url}/api`,
      ...rest,
    });
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
