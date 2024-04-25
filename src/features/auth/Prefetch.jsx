import React, { useEffect } from "react";
import { store } from "../../app/store";
import { Outlet } from "react-router-dom";
import { usersApiSlice } from "../users/usersApiSlice";
import { useSelector } from "react-redux";
import {
  selectRole,
  selectTeacherId,
  setSessionData,
} from "../session/sessionSlice";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

function Prefetch() {
  const teacher_id = useSelector(selectTeacherId);
  const role = useSelector(selectRole);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      localStorage.length > 0 &&
      (localStorage.key(0) === "access" || localStorage.key(1) === "access")
    ) {
      dispatch(setSessionData(jwtDecode(localStorage.getItem("access"))));
    }
  }, [localStorage.length]);

  useEffect(() => {
    if (teacher_id && role === "Teacher") {
      const currentTeacher = store.dispatch(
        usersApiSlice.endpoints.getUserById.initiate(teacher_id)
      );
      return () => {
        currentTeacher.unsubscribe();
      };
    }
  }, [teacher_id]);
  return <Outlet />;
}

export default Prefetch;
