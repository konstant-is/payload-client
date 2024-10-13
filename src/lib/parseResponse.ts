import { PayloadResponse } from "../types";

export const parseResponse = (res: any): PayloadResponse => {
  const { errors, message, ...rest } = res;

  return {
    message,
    errors,
    ...rest,
  };
};
