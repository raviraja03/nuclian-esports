import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearCredentials } from "../slices/auth";
import toast from "react-hot-toast";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_URL,
  credentials: "include",
  //   prepareHeaders: (headers, { getState }) => {
  //     const token = getState().auth.token;
  //     if (token) {
  //       headers.set("authorization", `Bearer ${token}`);
  //     }
  //     return headers;
  //   },
});

export const baseQueryWithAuth = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const msg = result?.error?.data?.message;

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
    toast.error(result?.error?.data?.message||"Server refused to fulfill this request.");
  }

  return result;
};
