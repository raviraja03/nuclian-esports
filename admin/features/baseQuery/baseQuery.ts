import { fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs } from "@reduxjs/toolkit/query";
import { clearCredentials } from "../slice/userSlice";
import {toast} from "sonner"

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL as string, // ✅ Next.js env var
  credentials: "include",
});

export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const msg = (result.error.data as { message?: string })?.message;

    if (msg?.includes("no longer exists")) {
      await rawBaseQuery(
        { url: "/users/logout", method: "POST" },
        api,
        extraOptions
      );
      api.dispatch(clearCredentials());
      toast.error("Session expired. You have been logged out.");
    }
  }

  if (result?.error?.status === 403) {
    toast.error("Your account has been suspended or deleted.");
  }

  return result;
};
