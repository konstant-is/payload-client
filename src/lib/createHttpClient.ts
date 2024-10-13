import { HttpClient, httpClient, HttpClientHelpers } from "./httpClient";
import { parseResponse } from "./parseResponse";

type Props = {
  basePath: string;
  log?: boolean;
} & HttpClientHelpers;

export const createHttpClient = (props: Props): HttpClient => {
  return httpClient({
    url: `${props.basePath}/api`,
    headers: () => {
      return {};
    },
    parseResponse: parseResponse,
    ...props,
  });
};
