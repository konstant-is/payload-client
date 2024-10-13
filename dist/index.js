"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  PayloadClient: () => PayloadClient
});
module.exports = __toCommonJS(src_exports);

// src/lib/httpClient.ts
var import_qs = __toESM(require("qs"));

// src/lib/logger.ts
var import_pino = require("pino");
var env = process.env.NODE_ENV || "development";
var createLogger = (props) => {
  if (env === "production") {
    return (0, import_pino.pino)({ name: props?.name });
  }
  return (0, import_pino.pino)({ name: props?.name });
};
var logger = createLogger();

// src/lib/httpClient.ts
var cache = process.env.NEXT_PUBLIC_CACHE_CONTROL || "force-cache";
var revalidate = Number(process.env.NEXT_PUBLIC_REVALIDATE) || false;
function httpClient(props) {
  const buildUrl = (endpoint, query) => {
    const queryString = import_qs.default.stringify(query, { addQueryPrefix: true });
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PayloadClient
});
//# sourceMappingURL=index.js.map