import { useField } from "formik";
import React from "react";

function SelectInput({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="input-group mb-3">
      <label htmlFor={props.id || props.name} className="input-group-text">
        {label}:
      </label>
      <select
        {...field}
        {...props}
        id={props.id || props.name}
        className="form-select"
      />
    </div>
  );
}

export default SelectInput;
