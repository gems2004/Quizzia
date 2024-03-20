import React from "react";

function InputGroup({
  id,
  label,
  onChange,
  value,
  placeholder,
  type,
  required,
}) {
  return (
    <div className="input-group mb-3 row">
      <label
        htmlFor={id}
        className="input-group-text col-1"
        style={{ minWidth: "6rem" }}
      >
        {label}:
      </label>
      <input
        id={id}
        name={id}
        onChange={onChange}
        value={value}
        className="form-control col-11"
        placeholder={placeholder}
        type={type}
        required={required ?? false}
      />
    </div>
  );
}

export default InputGroup;
