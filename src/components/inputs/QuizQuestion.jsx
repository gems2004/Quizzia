import React from "react";
import { useField } from "formik";

function QuizQuestion({ label, remove, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="input-group row mb-3">
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

export default QuizQuestion;
