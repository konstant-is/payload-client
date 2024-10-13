import qs from "qs";

import { logger } from "./logger";

const cache =
  (process.env.NEXT_PUBLIC_CACHE_CONTROL as RequestCache) || "force-cache";
const revalidate = Number(process.env.NEXT_PUBLIC_REVALIDATE) || false;

type HTTPMethods = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";

type Headers = Record<string, any>;
type NextConfigProps = {
  revalidate?: number | false;
  tags?: string[];
};
type RequestProps = {
  headers?: Headers;
  query?: any;
  nextConfig?: NextConfigProps;
};

export interface GetOpts extends RequestProps {}

type BodyProps = {
  type?: "POST" | "PATCH" | "PUT";
  body?: any;
  [x: string]: any;
};

export type HttpClient = {
  request: (
    endpoint: string,
    method: HTTPMethods,
    options?: RequestProps & BodyProps
  ) => Promise<any>;
  get: <T>(endpoint: string, props?: GetOpts) => Promise<T>;
  post: <T>(endpoint: string, props?: BodyProps) => Promise<T>;
  patch: <T>(endpoint: string, props?: BodyProps) => Promise<T>;
  put: <T>(endpoint: string, props?: BodyProps) => Promise<T>;
  delete: <T>(endpoint: string, props?: RequestProps) => Promise<T>;
};

export type HttpClientProps = {
  url: string;
  log?: boolean;
  headers?: () => Headers;
} & HttpClientHelpers;

export type HttpClientHelpers = {
  beforeRequest?: (props: { url: string } & RequestInit) => void;
  afterRequest?: (response: any) => void;
  parseResponse?: (response: any) => any;
};
export function httpClient(props: HttpClientProps): HttpClient {
  const buildUrl = (endpoint: string, query?: any): string => {
    const queryString = qs.stringify(query, { addQueryPrefix: true });
    return `${props.url}/${endpoint}${queryString}`;
  };

  const fetchJson = async (
    url: string,
    method: HTTPMethods,
    headers: Headers,
    next?: NextConfigProps,
    body?: any
  ): Promise<any> => {
    const requestOpts: RequestInit = {
      method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Cache-Control": cache,
        ...headers,
      },
      body: JSON.stringify(body),

      // @ts-ignore
      next: {
        revalidate: revalidate,
        tags: ["payload"],
        ...next,
      },
    };

    try {
      if (props.beforeRequest) {
        props.beforeRequest({ url, ...requestOpts });
      }

      const response = await fetch(url, requestOpts);
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();

      if (props.afterRequest) {
        props.afterRequest(data);
      }

      return props.parseResponse ? props.parseResponse(data) : data;
    } catch (error) {
      logger.error(`Error fetching ${url}`, error);
      throw error;
    }
  };

  const request: HttpClient["request"] = async (
    endpoint,
    method,
    options = {}
  ) => {
    const url = buildUrl(endpoint, options.query);

    const headers = options.headers || {};
    if (props.headers) {
      Object.assign(headers, props.headers());
    }

    return fetchJson(url, method, headers, options.nextConfig, options.body);
  };

  const postRequest: HttpClient["post"] = async (endpoint, props) =>
    request(endpoint, "POST", props);
  const putRequest: HttpClient["put"] = async (endpoint, props) =>
    request(endpoint, "PUT", props);
  const patchRequest: HttpClient["patch"] = async (endpoint, props) =>
    request(endpoint, "PATCH", props);

  return {
    request,
    get: (endpoint, props) => request(endpoint, "GET", props),
    delete: (endpoint, props) => request(endpoint, "DELETE", props),
    post: postRequest,
    put: putRequest,
    patch: patchRequest,
  };
}
