import { Where } from "payload/dist/exports/types";

export type TypeWithID = {
  id: number | string;
};

export type GeneratedTypes = {
  collections: {
    [key: string | number | symbol]: unknown;
  };
  globals: {
    [key: string]: unknown;
  };
};

export type BaseOptions<T extends keyof GeneratedTypes["collections"]> = {
  collection: T;
  depth?: number;
  fallbackLocale?: string;
  locale?: string;
  showHiddenFields?: boolean;
};

export type ByIDOptions<T extends keyof GeneratedTypes["collections"]> =
  BaseOptions<T> & {
    id: number | string;
    where?: never;
  };

export type ManyOptions<T extends keyof GeneratedTypes["collections"]> =
  BaseOptions<T> & {
    id?: never;
    where?: Where;
  };
