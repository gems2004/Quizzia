import React from "react";
import {
  useDeleteQuizMutation,
  useGetQuizByIdQuery,
  useGetStudentsRecordQuery,
} from "../../features/quizzes/quizApiSlice";
import { Link, useParams, useNavigate } from "react-router-dom";
import copy from "clipboard-copy";
import Spinner from "../../components/Spinner";

function QuizDetailsPage() {
  const { id: quiz_id } = useParams();
  const navigate = useNavigate();

  const { data: record, isLoading: isRecordLoading } =
    useGetStudentsRecordQuery(quiz_id);
  const { data: quiz, isLoading: isQuizLoading } = useGetQuizByIdQuery(quiz_id);
  const [deleteQuiz] = useDeleteQuizMutation();

  function copyQuizToken() {
    copy(quiz.quiz_token);
  }
  function handleQuizDelete() {
    deleteQuiz(quiz_id);
    navigate("/quiz");
  }

  const recordContent = (
    <section className="container my-4">
      <h4>معلومات الطلاب:</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>رقم الطالب</th>
            <th>الاسم</th>
            <th>الدرجة</th>
            <th>الدرجة</th>
            <th>الدرجة</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </section>
  );

  const quizContent = (
    <section className="container my-4">
      <h4>معلومات الاختبار:</h4>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <strong className="pe-2">اسم الاختبار:</strong>
          <span>{quiz?.name}</span>
        </li>
        <li className="list-group-item">
          <strong className="pe-2">مدة الاختبار:</strong>
          <span>{quiz?.req_time}</span>
        </li>
        <li className="list-group-item">
          <strong className="pe-2">عدد الاسئلة:</strong>
          <span>{quiz?.questions.length}</span>
        </li>
        <li className="list-group-item">
          <strong className="pe-2">رمز الاختبار:</strong>
          <span>{quiz?.quiz_token}</span>
          <button
            className="btn btn-outline-secondary ms-2"
            onClick={copyQuizToken}
          >
            انسخ
          </button>
        </li>
      </ul>
    </section>
  );

  return (
    <>
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="deleteAccountModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <form className="modal-content" onSubmit={handleQuizDelete}>
            <div className="modal-header">
              <h5 className="modal-title" id="deleteAccountModal">
                حذف الحساب
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>هل انت متأكد من حذف الاختبار؟</p>
              <p className="lead">ملاحظة: لا يمكن التراجع عن هذه الخطوة</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
              >
                إغلاق
              </button>
              <button
                type="submit"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                حذف
              </button>
            </div>
          </form>
        </div>
      </div>
      {isRecordLoading ? <Spinner /> : recordContent}
      {isQuizLoading ? <Spinner /> : quizContent}
      <section className="container my-4">
        <ol className="list-group list-group-numbered">
          {quiz?.questions?.map((question) => {
            return (
              <li className="list-group-item fw-bold" key={question.id}>
                <span>{question.question}</span>
                <ol
                  type="A"
                  className="d-flex justify-content-between gap-4 flex-wrap"
                >
                  {question.answers.map((answer, index) => {
                    return (
                      <li key={index}>
                        {answer.answer} {answer.is_correct && "✅"}
                      </li>
                    );
                  })}
                </ol>
              </li>
            );
          })}
        </ol>
        <div className="mt-4">
          <Link to="/quiz" className="btn btn-outline-secondary me-4">
            الرجوع
          </Link>
          <button
            className="btn btn-outline-danger"
            data-bs-toggle="modal"
            data-bs-target="#deleteModal"
          >
            حذف الاختبار
          </button>
        </div>
      </section>
    </>
  );
}

export default QuizDetailsPage;
