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

// src/operations/find.ts
var find = async (client, options) => {
  const { collection, ...rest } = options;
  return client.get(`${collection}`, {
    query: rest,
    nextConfig: {
      tags: ["payload"]
    }
  });
};
var findByID = (client, options) => {
  const { collection, id, ...rest } = options;
  const url = `${collection}/${id}`;
  return client.get(url, {
    query: rest,
    nextConfig: {
      tags: ["payload"]
    }
  });
};

// src/operations/update.ts
var update = (client, options) => {
  const { collection, data, ...rest } = options;
  return client.put(collection, {
    body: data,
    query: rest
  });
};
var updateByID = (client, options) => {
  const { collection, id, data, ...rest } = options;
  return client.put(`${collection}/${id}`, {
    body: data,
    query: rest
  });
};

// src/operations/create.ts
var create = (client, options) => {
  const { collection, data, ...rest } = options;
  return client.post(`${collection}`, {
    body: data,
    query: rest
  });
};

// src/operations/delete.ts
var deleteMany = (client, options) => {
  const { collection, ...rest } = options;
  return client.delete(`${collection}`, {
    query: rest
  });
};
var deleteByID = (client, options) => {
  const { collection, id, ...rest } = options;
  return client.delete(`${collection}/${id}`, {
    query: rest
  });
};

// src/operations/count.ts
var count = (client, options) => {
  const { collection, ...rest } = options;
  return client.get(`${collection}/count`, {
    query: rest,
    nextConfig: {
      tags: ["payload"]
    }
  });
};

// src/client.ts
var payloadRestClient = (config) => {
  const { log, url, ...props } = config;
  const client = httpClient({
    url: `${url}/api`,
    ...props
  });
  const find2 = async (options) => {
    return find(client, options);
  };
  const findByID2 = (options) => {
    return findByID(client, options);
  };
  const count2 = (options) => {
    return count(client, options);
  };
  const create2 = (options) => {
    return create(client, options);
  };
  const updateByID2 = (options) => {
    return updateByID(client, options);
  };
  const update2 = (options) => {
    return update(client, options);
  };
  const deleteMany2 = (options) => {
    return deleteMany(client, options);
  };
  const deleteByID2 = (options) => {
    return deleteByID(client, options);
  };
  return {
    find: find2,
    findByID: findByID2,
    count: count2,
    create: create2,
    update: update2,
    updateByID: updateByID2,
    delete: deleteMany2,
    deleteByID: deleteByID2
  };
};
export {
  payloadRestClient
};
//# sourceMappingURL=index.mjs.map