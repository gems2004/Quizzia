import { useField } from "formik";
import React from "react";

function RadioInput({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="form-check form-check-inline">
      <input
        className="form-check-input"
        type="radio"
        id={props.id}
        value={props.value}
        {...props}
        {...field}
      />
      <label className="form-check-label" htmlFor={props.id || props.name}>
        {label}
      </label>
    </div>
  );
}

export default RadioInput;
