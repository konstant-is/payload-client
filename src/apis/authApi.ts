import { HttpClient } from "@/lib/httpClient";
import { PayloadClientSettings, PayloadResponse } from "@/types";

import { User } from "@/lib/payloadTypes";

type LoginFn = (props: { email: string; password: string }) => Promise<User>;
type LogoutFn = () => Promise<PayloadResponse>;
type CurrentUserFn = () => Promise<PayloadResponse>;
type VerifyFn = (props: { token: string }) => Promise<PayloadResponse>;
type RefreshFn = () => Promise<PayloadResponse>;

export type AuthApi = {
  login: LoginFn;
  logout: LogoutFn;
  currentUser: CurrentUserFn;
  verify: VerifyFn;
  refresh: RefreshFn;
};

export const authApi =
  (client: HttpClient) =>
  (collection: string = "users"): AuthApi => {
    const login: LoginFn = async (props): Promise<User> => {
      return client.post(`${collection}/login`, {
        credentials: "include",
        body: props,
      });
    };

    const logout: LogoutFn = async () => {
      return client.post(`${collection}/logout`, {
        credentials: "include",
      });
    };

    const refresh: RefreshFn = async () => {
      return client.post(`${collection}/refresh-token`, {
        credentials: "include",
      });
    };

    const currentUser: CurrentUserFn = async () => {
      return client.get(`${collection}/me`);
    };

    const verify: VerifyFn = async (props) => {
      return client.post(`${collection}/verify/${props.token}`, {
        credentials: "include",
      });
    };

    return {
      login,
      logout,
      currentUser,
      verify,
      refresh,
    };
  };
