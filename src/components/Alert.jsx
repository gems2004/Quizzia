import React from "react";

function Alert({ color, label, removable }) {
  return (
    <div
      className={`alert alert-${color} alert-dismissible fade show align-self-start mt-4 w-50`}
      role="alert"
    >
      {label}
      {removable && (
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      )}
    </div>
  );
}

export default Alert;
