// src/lib/httpClient.ts
import qs from "qs";

// src/lib/logger.ts
import { pino } from "pino";
var env = process.env.NODE_ENV || "development";
var createLogger = (props) => {
  if (env === "production") {
    return pino({ name: props?.name });
  }
  return pino({ name: props?.name });
};
var logger = createLogger();

// src/lib/httpClient.ts
var cache = process.env.NEXT_PUBLIC_CACHE_CONTROL || "force-cache";
var revalidate = Number(process.env.NEXT_PUBLIC_REVALIDATE) || false;
function httpClient(props) {
  const buildUrl = (endpoint, query) => {
    const queryString = qs.stringify(query, { addQueryPrefix: true });
    return `${props.url}/${endpoint}${queryString}`;
  };
  const fetchJson = async (url, method, headers, next, body) => {
    const requestOpts = {
      method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Cache-Control": cache,
        ...headers
      },
      body: JSON.stringify(body),
      // @ts-ignore
      next: {
        revalidate,
        tags: ["payload"],
        ...next
      }
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
  const request = async (endpoint, method, options = {}) => {
    const url = buildUrl(endpoint, options.query);
    const headers = options.headers || {};
    if (props.headers) {
      Object.assign(headers, props.headers());
    }
    return fetchJson(url, method, headers, options.nextConfig, options.body);
  };
  const postRequest = async (endpoint, props2) => request(endpoint, "POST", props2);
  const putRequest = async (endpoint, props2) => request(endpoint, "PUT", props2);
  const patchRequest = async (endpoint, props2) => request(endpoint, "PATCH", props2);
  return {
    request,
    get: (endpoint, props2) => request(endpoint, "GET", props2),
    delete: (endpoint, props2) => request(endpoint, "DELETE", props2),
    post: postRequest,
    put: putRequest,
    patch: patchRequest
  };
}

// src/client.ts
var PayloadClient = class {
  client;
  constructor(props) {
    const { url, ...rest } = props;
    this.client = httpClient({
      url: `${url}/api`,
      ...rest
    });
  }
  find = async (options) => {
    const { collection, ...rest } = options;
    return this.client.get(collection, {
      query: rest
    });
  };
};
export {
  PayloadClient
};
//# sourceMappingURL=index.mjs.map