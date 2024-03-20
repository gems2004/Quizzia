import { useField } from "formik";
import React from "react";

function QuizAnswer({
  label,
  remove,
  index,
  answerIndex,
  radio,
  setCorrectAnswers,
  ...props
}) {
  const [field, meta] = useField(props);
  function handleChange() {
    setCorrectAnswers((prev) => {
      return {
        ...prev,
        [index]: answerIndex,
      };
    });
  }
  return (
    <div className="row mb-3">
      <div className="row col-11">
        <div className="input-group">
          <label
            htmlFor={props.id || props.name}
            className="input-group-text col-auto"
          >
            {label}:
          </label>
          <input
            className="form-control"
            id={props.name}
            autoComplete="false"
            {...field}
            {...props}
          />
          <div className="input-group-text col-1">
            <input
              className="form-check-input"
              id={`${props.name}.is_correct`}
              name={radio}
              type="radio"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <img
        src="/assets/delete.svg"
        className="col-1 pointer"
        title="Remove Question"
        alt="Remove Question"
        onClick={remove}
      />
    </div>
  );
}

export default QuizAnswer;
