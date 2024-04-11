import React from "react";
import { Formik, Form, Field } from "formik";
import { Link, useParams } from "react-router-dom";
import { useGetQuizByIdQuery } from "../../features/quizzes/quizApiSlice";
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
          السؤال: {questionIndex + 1}/{quiz.questions.length}
        </h2>
        <p className="lead">{quiz.questions[index].question}</p>
        <section>
          <Formik
            initialValues={{
              questions: {},
            }}
            onSubmit={(values, { setSubmitting }) => {
              if (Object.entries(values.questions).length < maxQuestions) {
                alert("All Answers are required");
              }
              console.log(values);
              setSubmitting(false);
            }}
          >
            <Form>
              {quiz.questions[questionIndex].answers.map(
                (answer, answerIndex) => {
                  return (
                    <div
                      key={answerIndex}
                      className="form-check form-check-inline"
                    >
                      <label
                        htmlFor={`answer_${questionIndex}_${answerIndex}`}
                        className="form-check-label"
                      >
                        {answer.answer}
                      </label>
                      <Field
                        id={`answer_${questionIndex}_${answerIndex}`}
                        type="radio"
                        name={`questions[${questionIndex}]`}
                        value={answer.answer}
                        className="form-check-input"
                      />
                    </div>
                  );
                }
              )}
              <button
                type="submit"
                className={`btn btn-primary d-block mt my-4 ${""}`}
              >
                Submit
              </button>
            </Form>
          </Formik>
        </section>
        <nav aria-label="Quiz navigation" className="mt-auto">
          <ul className="pagination justify-content-center">
            {/* Go to first */}
            <li className={questionIndex <= 0 ? "d-none" : "page-item"}>
              <Link
                className="page-link"
                to={`/quiz/${id}/0`}
                aria-label="Previous"
              >
                <span aria-hidden="true">&laquo;</span>
              </Link>
            </li>
            {/* Go to prev */}
            <li className={questionIndex <= 0 ? "d-none" : "page-item"}>
              <Link
                className="page-link"
                to={`/quiz/${id}/${questionIndex - 1}`}
              >
                {questionIndex}
              </Link>
            </li>
            {/* Current */}
            <li className="page-item disabled">
              <Link className="page-link" to={`/quiz/${id}/${index}`}>
                {questionIndex + 1}
              </Link>
            </li>
            {/* Go to next */}
            <li className="page-item">
              <Link
                className={`page-link ${
                  questionIndex + 1 >= maxQuestions ? "d-none" : ""
                }`}
                to={`/quiz/${id}/${questionIndex + 1}`}
              >
                {questionIndex + 2}
              </Link>
            </li>
            {/* Go to last */}
            <li
              className={
                questionIndex === maxQuestions - 1 ? "d-none" : "page-item"
              }
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
