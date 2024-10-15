import { BaseOptions, GeneratedTypes } from "../payload-types";
import { HttpClient } from "../lib/httpClient";

export type CreateOptions<TSlug extends keyof GeneratedTypes["collections"]> =
  BaseOptions<TSlug> & {
    data: Omit<
      GeneratedTypes["collections"][TSlug],
      "createdAt" | "id" | "updatedAt"
    > & {
      id?: string | null | undefined;
      createdAt?: string | null | undefined;
      updatedAt?: string | null | undefined;
    };
  };

export const create = <TSlug extends keyof GeneratedTypes["collections"]>(
  client: HttpClient,
  options: CreateOptions<TSlug>
): Promise<GeneratedTypes["collections"][TSlug]> => {
  const { collection, data, ...rest } = options;
  return client.post(`${collection as string}`, {
    body: data,
    query: rest,
  });
};
