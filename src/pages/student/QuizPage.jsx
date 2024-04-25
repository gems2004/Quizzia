import React from "react";
import { Formik, Form, Field } from "formik";
import { Link, useParams } from "react-router-dom";
import {
  useGetQuizByIdQuery,
  useSubmitQuizMutation,
} from "../../features/quizzes/quizApiSlice";
import Spinner from "../../components/Spinner";
import ErrorToken from "../../components/ErrorToken";
import Alert from "../../components/Alert";
import { useSelector } from "react-redux";
import { selectStudentId } from "../../features/session/sessionSlice";

function QuizPage() {
  const { id, index } = useParams();
  const {
    data: quiz,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetQuizByIdQuery(id);
  const [submitQuiz, { isSuccess: isSubmitSuccess }] = useSubmitQuizMutation();
  const student_id = useSelector(selectStudentId);

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
        <p className="lead">{quiz?.questions[index]?.question}</p>
        <section>
          <Formik
            initialValues={{
              answers: [],
            }}
            onSubmit={(values, { setSubmitting }) => {
              submitQuiz({
                chosenAnswers: values.answers.map((value) => {
                  return {
                    fk_answer_id: value.substr(0, value.indexOf("/")),
                    fk_question_id: value.substr(-1, value.indexOf("/")),
                  };
                }),
                quiz_id: quiz.id,
                student_id: student_id,
                time_spent: new Date(),
              });
              setSubmitting(false);
            }}
          >
            {({ values }) => (
              <Form>
                <ol id="answers-list" className="list-group mt-4">
                  {quiz?.questions[questionIndex]?.answers.map(
                    (answer, answerIndex) => {
                      return (
                        <li
                          key={answerIndex}
                          className="form-check answer-item list-group-item p-0"
                        >
                          <Field
                            id={`answer_${questionIndex}_${answerIndex}`}
                            type="radio"
                            name={`answers[${questionIndex}]`}
                            value={
                              answer.id +
                              "/" +
                              quiz?.questions[questionIndex].id
                            }
                            className="form-check-input quiz-answer-input d-none"
                          />
                          <label
                            // onClick={selectAnswer}
                            htmlFor={`answer_${questionIndex}_${answerIndex}`}
                            className="form-check-label pointer quiz-answer py-2 px-3 w-100"
                          >
                            {answer.answer}
                          </label>
                        </li>
                      );
                    }
                  )}
                </ol>
                <nav aria-label="Quiz navigation" className="my-5 py-5">
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
                        questionIndex === maxQuestions - 1
                          ? "d-none"
                          : "page-item"
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
                <button
                  type="submit"
                  className={`btn btn-primary d-block ${
                    Object.keys(values.answers).length <
                      quiz?.questions?.length || isSubmitSuccess
                      ? "disabled"
                      : ""
                  }`}
                >
                  إرسال الاختبار
                </button>
              </Form>
            )}
          </Formik>
          {isSubmitSuccess && (
            <Alert color="success" label="تم ارسال الاجوبة بنجاح" />
          )}
        </section>
      </div>
    );
  }

  if (isError && error.status === 401) return <ErrorToken />;
}

export default QuizPage;
