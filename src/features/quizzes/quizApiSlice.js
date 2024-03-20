import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const quizAdapter = createEntityAdapter({});

const initialState = quizAdapter.getInitialState();

export const quizApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllQuizzes: builder.query({
      query: (teacher_id) => `/quiz/teacher/${teacher_id}`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 5, // remove on deployment
      transformResponse: (responseData) => {
        return quizAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Quiz", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Quiz", id })),
          ];
        } else return [{ type: "Quiz", id: "LIST" }];
      },
    }),
    createNewQuiz: builder.mutation({
      query: (initialData) => ({
        url: "/quiz/create/",
        method: "POST",
        body: { ...initialData },
      }),
      invalidatesTags: [
        { type: "Quiz", id: "LIST" },
        { type: "Teacher", id: "LIST" },
      ],
    }),
    getQuizById: builder.query({
      query: (quiz_id) => `/quiz/${quiz_id}`,
    }),
    deleteQuiz: builder.mutation({
      query: (quiz_id) => ({
        url: `quiz/${quiz_id}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        { type: "Quiz", id: "LIST" },
        { type: "Teacher", id: "LIST" },
      ],
    }),
    getStudentsRecord: builder.query({
      query: (quiz_id) => `/quiz/teacher/record/${quiz_id}`,
    }),
    studentRequest: builder.mutation({
      query: (initialData) => ({
        url: `quiz/student/request/`,
        method: "POST",
        body: { ...initialData },
      }),
    }),
    getQuizRequests: builder.query({
      query: () => `quiz/teacher/requests`,
    }),
  }),
});

export const {
  useGetAllQuizzesQuery,
  useCreateNewQuizMutation,
  useGetQuizByIdQuery,
  useDeleteQuizMutation,
  useGetStudentsRecordQuery,
  useStudentRequestMutation,
  useGetQuizRequestsQuery,
} = quizApiSlice;

export const selectQuizzesResult =
  quizApiSlice.endpoints.getAllQuizzes.select();

const selectQuizzesData = createSelector(
  selectQuizzesResult,
  (quizzesResult) => quizzesResult.data
);

export const {
  selectAll: selectAllQuizzes,
  selectById: selectQuizById,
  selectIds: selectQuizzesIds,
} = quizAdapter.getSelectors(
  (state) => selectQuizzesData(state) ?? initialState
);
