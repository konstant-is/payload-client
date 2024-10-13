// src/client.ts
var PayloadClient = class {
  client;
  constructor(client) {
    this.client = client;
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