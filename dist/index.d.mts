import { GeneratedTypes } from 'payload';
import { Options } from 'payload/dist/collections/operations/local/find';
import { PaginatedDocs } from 'payload/dist/database/types';

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

declare class PayloadClient<TGeneratedTypes extends GeneratedTypes> {
    private client;
    constructor(props: HttpClientProps);
    find: <T extends keyof TGeneratedTypes["collections"]>(options: Options<T>) => Promise<PaginatedDocs<TGeneratedTypes["collections"][T]>>;
}

export { PayloadClient };
