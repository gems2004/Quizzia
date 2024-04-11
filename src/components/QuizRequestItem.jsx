import React, { useState } from "react";
import { useApproveRequestMutation } from "../features/quizzes/quizApiSlice";
import { useSelector } from "react-redux";
import { selectTeacherId } from "../features/session/sessionSlice";

function QuizRequestItem({
  request_id,
  student_name,
  student_id,
  quiz_name,
  since,
  token,
  isApproved,
}) {
  const teacher_id = useSelector(selectTeacherId);

  const [approveRequest, { error: declineError }] = useApproveRequestMutation();

  return (
    <div className="list-group-item d-flex align-items-center justify-content-around ">
      <p className="mb-0">
        اسم الطالب:
        <span className="text-muted"> {student_name}</span>
      </p>
      <p className="mb-0">
        اسم الاختبار:
        <span className="text-muted"> {quiz_name}</span>
      </p>
      <p className="mb-0">
        منذ:
        <span className="text-muted"> {since} دقيقة</span>
      </p>
      <div className="btn-group">
        <button
          className={`btn btn-outline-success ${since > 30 ? "disabled" : ""}`}
          onClick={() =>
            approveRequest({
              request_id: request_id,
              student: student_id,
              quiz_token: token,
              isApproved: true,
            })
          }
        >
          قبول
        </button>
        <button
          className="btn btn-outline-danger"
          onClick={() =>
            approveRequest({
              request_id: request_id,
              isApproved: false,
              student: student_id,
              quiz_token: token,
            })
          }
        >
          رفض
        </button>
      </div>
    </div>
  );
}

export default QuizRequestItem;
