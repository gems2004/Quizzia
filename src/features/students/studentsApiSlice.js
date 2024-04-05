import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const studentsAdapter = createEntityAdapter({});

const initialState = studentsAdapter.getInitialState();

export const studentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: (id) => `/users/students/${id}/`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        return studentsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Student", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Student", id })),
          ];
        } else return [{ type: "Student", id: "LIST" }];
      },
    }),
    getStudentById: builder.query({
      query: (studentId) => ({
        url: `/users/student/${studentId}/`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
        providesTags: (result, error, arg) => {
          if (result?.ids) {
            return [
              { type: "Student", id: "LIST" },
              ...result.ids.map((id) => ({ type: "Student", id })),
            ];
          } else return [{ type: "Student", id: "LIST" }];
        },
      }),
    }),
    editStudentName: builder.mutation({
      query: (student) => ({
        url: `/users/student/${student.id}/`,
        method: "PATCH",
        body: student,
      }),
      invalidatesTags: [{ type: "Student", id: "LIST" }],
    }),
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/users/student/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [
        { type: "Student", id: "LIST" },
        { type: "Teacher", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllStudentsQuery,
  useGetStudentByIdQuery,
  useEditStudentNameMutation,
  useDeleteStudentMutation,
} = studentsApiSlice;

export const selectStudentsResult =
  studentsApiSlice.endpoints.getAllStudents.select();

const selectStudentsData = createSelector(
  selectStudentsResult,
  (studentsResult) => studentsResult.data
);

export const {
  selectAll: selectAllStudents,
  selectById: selectStudentById,
  selectIds: selectStudentsIds,
} = studentsAdapter.getSelectors(
  (state) => selectStudentsData(state) ?? initialState
);
