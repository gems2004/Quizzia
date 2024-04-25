import { apiSlice } from "../api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (initialUserData) => ({
        url: "/users/teacher/register/",
        method: "POST",
        body: { ...initialUserData, is_teacher: 1 },
      }),
      invalidatesTags: [{ type: "Teacher", id: "LIST" }],
    }),
    getUserById: builder.query({
      query: (user_id) => ({
        url: `/users/teacher/${user_id}`,
      }),
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Teacher", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Teacher", id })),
          ];
        } else return [{ type: "Teacher", id: "LIST" }];
      },
    }),
    editUser: builder.mutation({
      query: (teacher) => ({
        url: `/users/teacher/${teacher.teacher_id}`,
        method: "PATCH",
        body: teacher,
      }),
      invalidatesTags: [{ type: "Teacher", id: "LIST" }],
    }),
    getAllTeachers: builder.query({
      query: () => `/users/teachers`,
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Teacher", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Teacher", id })),
          ];
        } else return [{ type: "Teacher", id: "LIST" }];
      },
    }),
    deleteUser: builder.mutation({
      query: (teacher_id) => ({
        url: `users/teacher/${teacher_id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Teacher", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetUserByIdQuery,
  useEditUserMutation,
  useGetAllTeachersQuery,
  useDeleteUserMutation,
} = usersApiSlice;
