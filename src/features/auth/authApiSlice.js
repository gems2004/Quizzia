import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (initialUserData) => ({
        url: "/users/token/",
        method: "POST",
        body: { ...initialUserData },
      }),
    }),
    createNewStudent: builder.mutation({
      query: (values) => ({
        url: "/users/student/register/",
        method: "POST",
        body: {
          user: {
            username: values.username,
            password: values.password,
          },
          fullname: values.fullname,
        },
      }),
      invalidatesTags: [
        { type: "Student", id: "LIST" },
        { type: "Teacher", id: "LIST" },
      ],
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: "/users/teacher/logout/",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(apiSlice.util.resetApiState());
        } catch (err) {
          console.log(err);
        }
      },
    }),
    refresh: builder.mutation({
      query: (oldToken) => ({
        url: "/users/token/refresh/",
        method: "POST",
        body: { refresh: oldToken },
      }),
      async onQueryStarted(arg, { dispatch: queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          const { access } = data;
          localStorage.setItem("access", access);
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useCreateNewStudentMutation,
  useSendLogoutMutation,
  useRefreshMutation,
} = authApiSlice;
