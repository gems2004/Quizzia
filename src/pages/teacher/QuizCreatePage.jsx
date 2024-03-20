import React, { useState } from "react";
import { FieldArray, Form, Formik } from "formik";
import QuizQuestion from "../../components/inputs/QuizQuestion";
import QuizAnswer from "../../components/inputs/QuizAnswer";
import TextInput from "../../components/inputs/TextInput";
import { useCreateNewQuizMutation } from "../../features/quizzes/quizApiSlice";
import { useSelector } from "react-redux";
import { selectTeacherId } from "../../features/session/sessionSlice";
import { useNavigate } from "react-router-dom";
import { useGetUserByIdQuery } from "../../features/users/usersApiSlice";
import UpgradePage from "./UpgradePage";

function QuizCreatePage() {
  const navigate = useNavigate();
  const teacher_id = useSelector(selectTeacherId);

  const { data: teacher } = useGetUserByIdQuery(teacher_id);

  const [createNewQuiz] = useCreateNewQuizMutation();

  const [correctAnswers, setCorrectAnswers] = useState({});

  if (teacher?.no_of_quizzes >= teacher?.bundle_data.no_of_quizzes)
    return (
      <UpgradePage
        quizLimit={teacher.bundle_data.no_of_quizzes}
        currentQuizNum={teacher.no_of_quizzes}
      />
    );

  return (
    <div className="container my-4">
      <h4 className="mb-4">إنشاء اختبار:</h4>

      <Formik
        initialValues={{
          quizName: "",
          quiz: [
            {
              question: "",
              answers: [{ answer: "", is_correct: false }],
              description: "test",
            },
          ],
        }}
        onSubmit={(values) => {
          try {
            values.quiz.map((quizItem, questionIndex) => {
              quizItem.answers.map((answer, answerIndex) => {
                if (correctAnswers[questionIndex] === answerIndex)
                  return (answer.is_correct = true);
                else return answer;
              });
            });
            createNewQuiz({
              name: values.quizName,
              fk_teacher_id: teacher_id,
              questions: values.quiz,
              req_time: "60",
            });
            navigate("/quiz");
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({ values }) => (
          <Form>
            <TextInput
              label="اسم الاختبار"
              name="quizName"
              type="text"
              placeholder="ادخل اسم الاختبار"
            />
            <FieldArray name="quiz">
              {({ push, remove }) => (
                <>
                  {values.quiz.map((quizItem, index) => (
                    <div key={index}>
                      <QuizQuestion
                        label={`السؤال ${index + 1}`}
                        name={`quiz.${index}.question`}
                        type="text"
                        placeholder="ادخل السؤال"
                        remove={() => remove(index)}
                      />

                      <FieldArray name={`quiz.${index}.answers`}>
                        {({ push: pushAnswer, remove: removeAnswer }) => (
                          <>
                            {quizItem.answers.map((answer, answerIndex) => (
                              <div key={answerIndex} className="col-10">
                                <QuizAnswer
                                  label={`الجواب ${answerIndex + 1}`}
                                  name={`quiz.${index}.answers.${answerIndex}.answer`}
                                  type="text"
                                  placeholder="ادخل الجواب"
                                  remove={() => removeAnswer()}
                                  setCorrectAnswers={setCorrectAnswers}
                                  radio={`quiz.${index}.question`}
                                  index={index}
                                  answerIndex={answerIndex}
                                />
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() =>
                                pushAnswer({
                                  answer: "",
                                  is_correct: false,
                                })
                              }
                              className="btn btn-outline-secondary"
                            >
                              Add Answer
                            </button>
                            <hr />
                          </>
                        )}
                      </FieldArray>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      push({
                        question: "",
                        description: "test",
                        answers: [{ answer: "", is_correct: false }],
                      })
                    }
                    className="btn btn-outline-primary "
                  >
                    Add Question
                  </button>
                </>
              )}
            </FieldArray>
            <button type="submit" className="btn btn-success">
              حفظ الاختبار
            </button>
          </Form>
        )}
      </Formik>

      {/* <nav aria-label="Quiz navigation" className="mt-auto">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${question == "1" ? "d-none" : ""}`}>
            <Link
              className="page-link"
              to={`/quiz/create/1`}
              aria-label="First"
            >
              <span aria-hidden="true">&laquo;</span>
            </Link>
          </li>
          <li className={`page-item ${question == "1" ? "d-none" : ""}`}>
            <Link
              className="page-link"
              to={`/quiz/create/${question - 1}`}
              aria-label="Previous"
            >
              {question - 1}
            </Link>
          </li>
          <li className="page-item disabled">
            <Link className="page-link" to={`/quiz/create/${question}`}>
              {question}
            </Link>
          </li>
          <li className="page-item">
            <Link
              className={`page-link ${
                question + 1 > numberOfQuestions ? "d-none" : ""
              }`}
              to={`/quiz/create/${question + 1}`}
              aria-label="Next"
            >
              {question + 1}
            </Link>
          </li>
          <li
            className={`page-item ${
              question + 1 > numberOfQuestions ? "d-none" : ""
            }`}
          >
            <Link
              className="page-link"
              to={`/quiz/create/${question}`}
              aria-label="Last"
            >
              <span aria-hidden="true">&raquo;</span>
            </Link>
          </li>
        </ul>
      </nav> */}
    </div>
  );
}

export default QuizCreatePage;
