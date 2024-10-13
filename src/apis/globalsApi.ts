// import { HttpClient } from "@repo/utils/httpClient";

// import { Globals, PayloadClientSettings, QueryParams } from "../types";
// import { createQuery } from "../lib/utils";

// type RequestProps<T extends keyof Globals> = {
//   query?: QueryParams<Globals[T]>;
// };

// export type GlobalsApi<T extends keyof Globals> = {
//   get: (props?: RequestProps<T>) => Promise<Globals[T]>;
// };

// export const globalsApi =
//   (client: HttpClient, opts: PayloadClientSettings) =>
//   <T extends keyof Globals>(collection: T): GlobalsApi<T> => {
//     const get = async (props?: RequestProps<T>): Promise<Globals[T]> => {
//       return client.get(`globals/${collection}`, {
//         query: createQuery(props?.query, opts),
//       });
//     };

//     return {
//       get,
//     };
//   };
