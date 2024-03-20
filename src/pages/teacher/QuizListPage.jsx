import React from "react";
import QuizListItem from "../../components/QuizListItem";
import { Link } from "react-router-dom";
import { useGetAllQuizzesQuery } from "../../features/quizzes/quizApiSlice";
import ErrorToken from "../../components/ErrorToken";
import Spinner from "../../components/Spinner";
import { useSelector } from "react-redux";
import { selectTeacherId } from "../../features/session/sessionSlice";
import Forbidden from "../../components/Forbidden";

function QuizListPage() {
  const teacher_id = useSelector(selectTeacherId);

  const {
    data: quizzes,
    isError,
    error,
    isSuccess,
    isLoading,
  } = useGetAllQuizzesQuery(teacher_id);

  if ((isError && error.status === 403) || !teacher_id) return <Forbidden />;

  if (isLoading) return <Spinner />;

  if (isSuccess) {
    return (
      <div className="container my-4">
        <h4 className="my-4">قائمة الاختبارات:</h4>
        {quizzes.ids?.length <= 0 ? (
          <p className="lead">لا يوجد اختبارات</p>
        ) : (
          <div className="list-group">
            {Object.entries(quizzes?.entities)?.map(([key, value]) => (
              <QuizListItem
                key={value.id}
                id={value.id}
                title={value.name}
                questions={value.questions.length}
              />
            ))}
          </div>
        )}
        <Link to="create" className="btn btn-outline-success my-4">
          إنشاء اختبار
        </Link>
      </div>
    );
  }

  if (isError && error.status === 401) return <ErrorToken />;
}

export default QuizListPage;
