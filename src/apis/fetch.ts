export const fetchApi = () => {
  return {
    get: async (url: string, options: any) => {
      return fetch(url, options);
    },
  };
};
