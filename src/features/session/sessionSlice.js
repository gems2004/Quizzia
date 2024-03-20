import { createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({
  name: "session",
  initialState: {},
  reducers: {
    getSessionData: (state) => {
      return state;
    },
    setSessionData: (state, action) => {
      state.user_id = action.payload.user_id;
      state.teacher_id = action.payload.teacher_id;
      state.student_id = action.payload.student_id;
      state.role = action.payload.role;
    },
  },
});

export const { getSessionData, setSessionData } = sessionSlice.actions;

export default sessionSlice.reducer;

export const selectUserId = (state) => state.session.user_id;
export const selectTeacherId = (state) => state.session.teacher_id;
export const selectStudentId = (state) => state.session.student_id;
export const selectRole = (state) => state.session.role;
