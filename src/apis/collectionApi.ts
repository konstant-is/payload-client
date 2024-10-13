// import { Paged } from "@/types";
// import { HttpClient } from "@/lib/httpClient";

// import {
//   PayloadClientSettings,
//   PayloadCreateResponse,
//   RequestProps,
// } from "@/types";
// import { createQuery } from "@/lib/utils";
// import { PayloadConfig } from "@/lib/payloadTypes";
// import { SanitizedConfig } from "payload/config";

// export type Props = {
//   config: SanitizedConfig;
//   client: HttpClient;
//   opts: PayloadClientSettings;
// };

// // export type CollectionApi<T extends keyof Collections> = {
// //   find: (props?: RequestProps<T>) => Promise<Paged<Collections[T]>>;
// //   findOne: (props?: RequestProps<T>) => Promise<Collections[T] | null>;
// //   findById: (id: string, props?: RequestProps<T>) => Promise<Collections[T]>;
// //   findBySlug: (
// //     slug: string,
// //     props?: RequestProps<T>
// //   ) => Promise<Collections[T][] | null>;
// //   create: (data: any) => Promise<PayloadCreateResponse<Collections[T]>>;
// //   update: (data: any) => any;
// //   updateById: (id: string, data: any) => any;
// //   delete: (data: any) => any;
// //   deleteById: (id: string) => any;
// // };

// export const collectionApi = (props: Props) => {
//   // <T extends keyof Collections>(collection: T): CollectionApi<T> => {
//   const { client, opts, config } = props;

//   const find = async (
//     props?: RequestProps<T>
//   ): Promise<Paged<config.collection[T]>> => {
//     return client.get(`${collection}`, {
//       query: createQuery(props?.query, opts),
//       nextConfig: {
//         tags: ["payload"],
//       },
//     });
//   };

//   const findOne = async (
//     props?: RequestProps<T>
//   ): Promise<Collections[T] | null> => {
//     const result = await find(props);

//     if (result.docs.length === 0) {
//       return null;
//     }
//     return result.docs[0] ?? null;
//   };

//   const findById = async (
//     id: string,
//     props?: RequestProps<T>
//   ): Promise<Collections[T]> => {
//     return client.get(`/${collection}/${id}`, {
//       query: createQuery(props?.query, opts),
//       nextConfig: {
//         tags: ["payload"],
//       },
//     });
//   };

//   const findBySlug = async (
//     slug: string,
//     props?: RequestProps<T>
//   ): Promise<Collections[T][] | null> => {
//     // const query: FindQueryParams<Collections[T]> = {
//     //   where: { slug: { equals: slug } } as {
//     //     [key in keyof Collections[T]]?: any;
//     //   },
//     // };
//     const whereQuery = {
//       ...props?.query,
//       where: { slug: { equals: slug }, ...props?.query?.where } as {
//         [key in keyof Collections[T]]?: any;
//       },
//     };

//     const data = await find({ query: createQuery(whereQuery, opts) });

//     return data.docs;
//   };

//   // TODO: Implement
//   const findByUri = async (uri: string): Promise<Collections[T] | null> => {
//     // TODO: Get the collection by slugs (multiple)
//     // TODO: Identify the collection by the uri
//     throw new Error("Not implemented");
//   };

//   const create = async (
//     data: T
//   ): Promise<PayloadCreateResponse<Collections[T]>> => {
//     return client.post(`/${collection}`, { body: data });
//   };

//   const update = async (data: any): Promise<any> => {
//     throw new Error("Not implemented");
//   };

//   const updateById = async (id: string, data: any): Promise<any> => {
//     throw new Error("Not implemented");
//   };
//   const deleteCollection = async (data: any): Promise<any> => {
//     throw new Error("Not implemented");
//   };
//   const deleteById = async (id: string): Promise<any> => {
//     throw new Error("Not implemented");
//   };

//   return {
//     find,
//     findOne: findOne,
//     findById,
//     findBySlug,
//     create,
//     update,
//     updateById,
//     delete: deleteCollection,
//     deleteById,
//   };
// };
