import React from "react";
import InputGroup from "./InputGroup";

function QuizAnswerItem({
  answerId,
  label,
  onChange,
  value,
  placeholder,
  type,
  required,
}) {
  return (
    <>
      <div className="input-group mb-3 row">
        <label
          htmlFor={answerId}
          className="input-group-text col-1"
          style={{ minWidth: "6rem" }}
        >
          {label}:
        </label>

        <input
          id={answerId}
          name={answerId}
          onChange={onChange}
          value={value}
          className="form-control col-9"
          placeholder={placeholder}
          type={type}
          required={required ?? false}
        />
        <div className="input-group-text col-1 px-0 justify-content-center">
          <input className="form-check-input" type="checkbox" />
        </div>
      </div>
    </>
  );
}

export default QuizAnswerItem;
