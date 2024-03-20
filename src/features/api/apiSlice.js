import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseQuery = fetchBaseQuery({
  baseUrl: "http://127.0.0.1:8000",
  credentials: "include",
  prepareHeaders: (headers) => {
    const access = localStorage.getItem("access");
    if (access) {
      headers.set("authorization", `Bearer ${access}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  const refresh = localStorage.getItem("refresh");

  if (result?.error?.status === 401 && refresh) {
    const refreshResult = await baseQuery(
      {
        url: "/users/teacher/token/refresh/",
        method: "POST",
        body: {
          refresh: refresh,
        },
      },
      api,
      { method: "POST" }
    );
    if (refreshResult?.data) {
      localStorage.setItem("access", refreshResult.data.access);
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 401) {
        refreshResult.error.data.message = "Your login has expired";
      }
      return refreshResult;
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Teacher", "Bundles", "Student", "Quiz"],
  endpoints: (builder) => ({}),
});
