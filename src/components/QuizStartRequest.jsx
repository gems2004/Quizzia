import React, { useState } from "react";
import { useStudentRequestMutation } from "../features/quizzes/quizApiSlice";
import { useSelector } from "react-redux";
import { selectStudentId } from "../features/session/sessionSlice";

function QuizStartRequest() {
  const student_id = useSelector(selectStudentId);
  const [quizToken, setQuizToken] = useState("");
  const [studentRequest, { isLoading, isError, error, isSuccess }] =
    useStudentRequestMutation();

  function sendRequest(e) {
    e.preventDefault();
    studentRequest({ quiz_token: quizToken, student: student_id });
  }

  return (
    <form onSubmit={sendRequest}>
      <div className="input-group row mb-3">
        <label htmlFor="QuizToken" className="input-group-text col-auto">
          رمز الاختبار
        </label>
        <input
          className="form-control"
          id="QuizToken"
          autoComplete="false"
          autoSave="false"
          placeholder="ادخل الرمز"
          onChange={(e) => setQuizToken(e.target.value)}
        />
      </div>
      <button
        className={`btn ${
          quizToken === "" || isLoading
            ? "disabled btn-outline-secondary"
            : "btn-outline-primary"
        }`}
      >
        ارسل طلب
      </button>
      {isError && (
        <div
          className="alert alert-danger fade show align-self-start mt-4 mw-50"
          role="alert"
        >
          {error.status === 400 && "الرمز المدخل غير صحيح"}
          {error.status === 401 && "انتهت الجلسة. الرجاء تسجيل الدخول مرة أخرى"}
        </div>
      )}
      {isSuccess && (
        <div
          className="alert alert-success fade show align-self-start mt-4 mw-50"
          role="alert"
        >
          تم ارسال طلب إلى استاذك... انتظر قبول الطلب
        </div>
      )}
    </form>
  );
}

export default QuizStartRequest;
