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
    <div className="d-flex justify-content-around">
      <div className="input-group row mb-3 max-width-95">
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
        <div className="input-group-text col-auto ">
          <input
            className="form-check-input"
            id={`${props.name}.is_correct`}
            name={radio}
            type="radio"
            onChange={handleChange}
          />
        </div>
      </div>
      <img
        src="/assets/x.svg"
        width="20px"
        height="20px"
        className="pointer my-2"
        title="Remove Question"
        alt="Remove Question"
        onClick={remove}
      />
    </div>
  );
}

export default QuizAnswer;
