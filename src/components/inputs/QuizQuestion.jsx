import React from "react";
import { useField } from "formik";

function QuizQuestion({ label, remove, ...props }) {
  const [field, meta] = useField(props);
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
      </div>
      <img
        src="/assets/x.svg"
        height="20px"
        width="20px"
        className="pointer my-2"
        title="Remove Question"
        alt="Remove Question"
        onClick={remove}
      />
    </div>
  );
}

export default QuizQuestion;
