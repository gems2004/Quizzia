import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const bundlesAdapter = createEntityAdapter({});

const initialState = bundlesAdapter.getInitialState();

export const bundlesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNewBundle: builder.mutation({
      query: (initialData) => ({
        url: "/bundles/",
        method: "POST",
        body: initialData,
      }),
      invalidatesTags: [{ type: "Bundle", id: "LIST" }],
    }),
    getAllBundles: builder.query({
      query: () => `/bundles/`,
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Bundles", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Bundles", id })),
          ];
        } else return [{ type: "Bundles", id: "LIST" }];
      },
    }),
    getBundleById: builder.query({
      query: (bundle_id) => `/bundles/${bundle_id}`,
    }),
    editBundle: builder.mutation({
      query: (values) => ({
        url: `/bundles/${values.id}`,
        method: "PATCH",
        body: values,
      }),
      invalidatesTags: [{ type: "Bundles", id: "LIST" }],
    }),
    deleteBundle: builder.mutation({
      query: (id) => ({
        url: `/bundles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Bundles", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateNewBundleMutation,
  useGetAllBundlesQuery,
  useGetBundleByIdQuery,
  useEditBundleMutation,
  useDeleteBundleMutation,
} = bundlesApiSlice;
