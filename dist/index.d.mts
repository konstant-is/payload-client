import { GeneratedTypes } from 'payload';
import { Options } from 'payload/dist/collections/operations/local/find';
import { PaginatedDocs } from 'payload/dist/database/types';

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
interface GetOpts extends RequestProps {
}
type BodyProps = {
    type?: "POST" | "PATCH" | "PUT";
    body?: any;
    [x: string]: any;
};
type HttpClient = {
    request: (endpoint: string, method: HTTPMethods, options?: RequestProps & BodyProps) => Promise<any>;
    get: <T>(endpoint: string, props?: GetOpts) => Promise<T>;
    post: <T>(endpoint: string, props?: BodyProps) => Promise<T>;
    patch: <T>(endpoint: string, props?: BodyProps) => Promise<T>;
    put: <T>(endpoint: string, props?: BodyProps) => Promise<T>;
    delete: <T>(endpoint: string, props?: RequestProps) => Promise<T>;
};

declare class PayloadClient<TGeneratedTypes extends GeneratedTypes> {
    private client;
    constructor(client: HttpClient);
    find: <T extends keyof TGeneratedTypes["collections"]>(options: Options<T>) => Promise<PaginatedDocs<TGeneratedTypes["collections"][T]>>;
}

export { PayloadClient };
