import React from "react";
import { FieldArray, Field } from "formik";
import { useParams } from "react-router-dom";

function QuizAnswersField({ answers }) {
  const { id } = useParams();
  console.log(answers);
  return (
    <FieldArray name="answers">
      {({ push, remove }) => (
        <div>
          {answers?.map((answer, index) => (
            <div key={index}>
              <Field name={`answer_${id - 1}`} type="radio" />
            </div>
          ))}
        </div>
      )}
    </FieldArray>
  );
}

export default QuizAnswersField;
