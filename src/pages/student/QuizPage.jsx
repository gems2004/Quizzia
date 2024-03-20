import React from "react";
import { Formik, Form, Field } from "formik";
import { Link, useParams } from "react-router-dom";
import {
  selectQuizById,
  useGetAllQuizzesQuery,
  useGetQuizByIdQuery,
} from "../../features/quizzes/quizApiSlice";
import Spinner from "../../components/Spinner";
import ErrorToken from "../../components/ErrorToken";

function QuizPage() {
  const { id, index } = useParams();
  const {
    data: quiz,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetQuizByIdQuery(id);

  const maxQuestions = quiz?.questions?.length;
  const questionIndex = parseInt(index);

  if (isLoading) return <Spinner />;

  if (isSuccess) {
    return (
      <div className="container my-4 d-flex flex-column h-100">
        <p className="h4 my-4">
          المدة: <span className="text-muted">{quiz.req_time} دقيقة</span>
        </p>
        <h2 className="my-4">
          السؤال: {index}/{quiz.questions.length}
        </h2>
        <p className="lead">{quiz.questions[index - 1].question}</p>
        <section>
          <Formik
            initialValues={{
              questions: {},
            }}
            onSubmit={(values, { setSubmitting }) => {
              if (Object.entries(values.questions).length < maxQuestions) {
                alert("All Answers are required");
              }
              setSubmitting(false);
            }}
          >
            <Form>
              {quiz.questions[index - 1].answers.map((answer, answerIndex) => {
                return (
                  <div
                    key={answerIndex}
                    className="form-check form-check-inline"
                  >
                    <label
                      htmlFor={`answer_${index - 1}_${answerIndex}`}
                      className="form-check-label"
                    >
                      {answer.answer}
                    </label>
                    <Field
                      id={`answer_${index - 1}_${answerIndex}`}
                      type="radio"
                      name={`questions[${index - 1}]`}
                      value={answer.answer}
                      className="form-check-input"
                    />
                  </div>
                );
              })}
              <button
                type="submit"
                className={`btn btn-primary d-block mt my-4`}
              >
                Submit
              </button>
            </Form>
          </Formik>
        </section>
        <nav aria-label="Quiz navigation" className="mt-auto">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${index === "1" ? "d-none" : ""}`}>
              <Link
                className="page-link"
                to={`/quiz/${id}/1`}
                aria-label="Previous"
              >
                <span aria-hidden="true">&laquo;</span>
              </Link>
            </li>
            <li className={`page-item ${index === "1" ? "d-none" : ""}`}>
              <Link
                className="page-link"
                to={`/quiz/${id}/${questionIndex - 1}`}
              >
                {questionIndex - 1}
              </Link>
            </li>
            <li className="page-item disabled">
              <Link className="page-link" to={`/quiz/${id}/${index}`}>
                {index}
              </Link>
            </li>
            <li className="page-item">
              <Link
                className={`page-link ${
                  questionIndex + 1 > maxQuestions ? "d-none" : ""
                }`}
                to={`/quiz/${id}/${questionIndex + 1}`}
              >
                {questionIndex + 1}
              </Link>
            </li>
            <li
              className={`page-item ${
                questionIndex === maxQuestions ? "d-none" : ""
              }`}
            >
              <Link
                className="page-link"
                to={`/quiz/${id}/${maxQuestions}`}
                aria-label="Next"
              >
                <span aria-hidden="true">&raquo;</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }

  if (isError && error.status === 401) return <ErrorToken />;
}

export default QuizPage;
