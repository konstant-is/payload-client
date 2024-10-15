import { Where } from "payload/dist/types";

import { HttpClient } from "@/lib/httpClient";
import { BaseOptions, GeneratedTypes } from "@/types";

export type CountOptions<T extends keyof GeneratedTypes["collections"]> =
  BaseOptions<T> & {
    where?: Where;
  };

export const count = <T extends keyof GeneratedTypes["collections"]>(
  client: HttpClient,
  options: CountOptions<T>
): Promise<{ totalDocs: number }> => {
  const { collection, ...rest } = options;
  return client.get(`${collection as string}/count`, {
    query: rest,
    nextConfig: {
      tags: ["payload"],
    },
  });
};
