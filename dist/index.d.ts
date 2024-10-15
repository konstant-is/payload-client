import { BulkOperationResult } from 'payload/dist/collections/config/types';
import { PaginatedDocs } from 'payload/dist/database/types';
import { Where } from 'payload/dist/exports/types';
import { DeepPartial } from 'ts-essentials';
import { Where as Where$1 } from 'payload/dist/types';

type Headers = Record<string, any>;
type HttpClientProps = {
    url: string;
    log?: boolean;
    headers?: () => Headers;
} & HttpClientHelpers;
type HttpClientHelpers = {
    beforeRequest?: (props: {
        url: string;
    } & RequestInit) => void;
    afterRequest?: (response: any) => void;
    parseResponse?: (response: any) => any;
};

type GeneratedTypes = {
    collections: {
        [key: string | number | symbol]: unknown;
    };
    globals: {
        [key: string]: unknown;
    };
};
type BaseOptions<T extends keyof GeneratedTypes["collections"]> = {
    collection: T;
    depth?: number;
    fallbackLocale?: string;
    locale?: string;
    showHiddenFields?: boolean;
};
type ByIDOptions<T extends keyof GeneratedTypes["collections"]> = BaseOptions<T> & {
    id: number | string;
    where?: never;
};
type ManyOptions<T extends keyof GeneratedTypes["collections"]> = BaseOptions<T> & {
    id?: never;
    where?: Where;
};

type FindOptions<T extends keyof GeneratedTypes["collections"]> = ManyOptions<T> & {
    limit?: number;
    page?: number;
    pagination?: boolean;
    sort?: string;
};
type FindByIdOptions<T extends keyof GeneratedTypes["collections"]> = ByIDOptions<T>;

type UpdateByIDOptions<TSlug extends keyof GeneratedTypes["collections"]> = ByIDOptions<TSlug> & {
    data: DeepPartial<GeneratedTypes["collections"][TSlug]>;
};
type UpdateOptions<TSlug extends keyof GeneratedTypes["collections"]> = ManyOptions<TSlug> & {
    data: DeepPartial<GeneratedTypes["collections"][TSlug]>;
};

type CreateOptions<TSlug extends keyof GeneratedTypes["collections"]> = BaseOptions<TSlug> & {
    data: Omit<GeneratedTypes["collections"][TSlug], "createdAt" | "id" | "updatedAt"> & {
        id?: string | null | undefined;
        createdAt?: string | null | undefined;
        updatedAt?: string | null | undefined;
    };
};

type CountOptions<T extends keyof GeneratedTypes["collections"]> = BaseOptions<T> & {
    where?: Where$1;
};

type RestConfig = {
    log?: boolean;
} & HttpClientProps;
declare const payloadRestClient: <TGeneratedTypes extends GeneratedTypes>(config: RestConfig) => {
    find: <T extends keyof TGeneratedTypes["collections"]>(options: FindOptions<T>) => Promise<PaginatedDocs<TGeneratedTypes["collections"][T]>>;
    findByID: <T extends keyof GeneratedTypes["collections"]>(options: FindByIdOptions<T>) => Promise<GeneratedTypes["collections"][T]>;
    count: <T extends keyof GeneratedTypes["collections"]>(options: CountOptions<T>) => Promise<{
        totalDocs: number;
    }>;
    create: <TSlug extends keyof GeneratedTypes["collections"]>(options: CreateOptions<TSlug>) => Promise<GeneratedTypes["collections"][TSlug]>;
    update: <TSlug extends keyof GeneratedTypes["collections"]>(options: UpdateOptions<TSlug>) => Promise<BulkOperationResult<TSlug>>;
    updateByID: <TSlug extends keyof GeneratedTypes["collections"]>(options: UpdateByIDOptions<TSlug>) => Promise<GeneratedTypes["collections"][TSlug]>;
    delete: <TSlug extends keyof GeneratedTypes["collections"]>(options: ManyOptions<TSlug>) => Promise<BulkOperationResult<TSlug>>;
    deleteByID: <TSlug extends keyof GeneratedTypes["collections"]>(options: ByIDOptions<TSlug>) => Promise<GeneratedTypes["collections"][TSlug]>;
};

export { payloadRestClient };
