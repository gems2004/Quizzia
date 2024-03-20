import { useField } from "formik";
import React from "react";

function TextInput({ label, ...props }) {
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
    </div>
  );
}

export default TextInput;
