// // https://payloadcms.com/docs/rest-api/overview

// import { HttpClient, HttpClientHelpers } from "@/lib/httpClient";

// import { collectionApi } from "./apis/collectionApi";
// import { globalsApi } from "./apis/globalsApi";
// import { authApi } from "./apis/authApi";
// import { createHttpClient } from "./lib/createHttpClient";
// import { PayloadClientSettings } from "./types";

// const api = (client: HttpClient, opts: PayloadClientSettings) => {
//   const _opts = opts;

//   return {
//     collection: collectionApi(client, _opts),
//     globals: globalsApi(client, _opts),
//     auth: authApi(client),
//     setLocale: (locale: string) => {
//       _opts.locale = locale;
//     },
//   };
// };

// export type PayloadClient = ReturnType<typeof api>;

// type Props = {
//   basePath: string;
//   log?: boolean;
// } & PayloadClientSettings &
//   HttpClientHelpers;

// export const createPayloadClient = (props: Props): PayloadClient => {
//   const httpClient = createHttpClient(props);

//   return api(httpClient, {
//     locale: props.locale,
//     fallbackLocale: props.fallbackLocale,
//     defaultDepth: props.defaultDepth,
//   });
// };
