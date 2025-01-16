import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { verifyToken } from "../../utils/verifyToken";
import { logout, setUser } from "../features/auth/authSlice";
import { toast } from "sonner";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    // set token in header here
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  const toastId = (api.getState() as RootState).auth.loginToastId;

  if (result?.error?.status === 404) {
    toast.error("User not found", { id: toastId as string });
  }

  if (result?.error?.status === 403) {
    toast.error("Credentials are incorrect", { id: toastId as string });
  }

  if (result?.error && result?.error?.status === 401) {
    // send refresh token
    const res = await fetch("http://localhost:5000/api/v1/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });
    const refreshTokenResult = await res.json();

    // checking if the refresh token expired or not
    if (refreshTokenResult?.data?.accessToken) {
      const user = verifyToken(refreshTokenResult.data.accessToken);

      // store new access token in redux
      api.dispatch(
        setUser({
          user: user,
          token: refreshTokenResult.data.accessToken,
        })
      );

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    }

    // if refresh token is expired
    api.dispatch(logout());
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});

export default baseApi;
