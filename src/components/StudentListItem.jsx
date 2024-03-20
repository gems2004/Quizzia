import React from "react";
import { Link } from "react-router-dom";

function StudentListItem({ id, name }) {
  return (
    <Link
      to={`${id}`}
      className="list-group-item list-group-item-action d-flex justify-content-between"
    >
      <div className="d-flex gap-4">
        <p className="mb-0">
          الرقم:
          <span className="text-muted text-black rounded-pill"> {id} </span>
        </p>
        <p className="mb-0">
          الاسم:
          <span className="text-muted text-black ms-2">{name}</span>
        </p>
      </div>
    </Link>
  );
}

export default StudentListItem;
