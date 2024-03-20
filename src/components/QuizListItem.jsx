import React from "react";
import { Link } from "react-router-dom";
import { selectRole } from "../features/session/sessionSlice";
import { useSelector } from "react-redux";

function QuizListItem({ id, title, questions }) {
  const role = useSelector(selectRole);
  return (
    <Link
      to={role === "Student" ? `${id}/1` : `${id}`}
      className="list-group-item list-group-item-action d-flex justify-content-between"
    >
      <div className="d-flex gap-4">
        <p className="mb-0">
          الرقم:
          <span className="text-muted text-black rounded-pill"> {id} </span>
        </p>
        <p className="mb-0">
          العنوان:
          <span className="text-muted text-black"> {title}</span>
        </p>
        <p className="mb-0">
          عدد الأسئلة:
          <span className="text-muted text-black"> {questions}</span>
        </p>
      </div>
    </Link>
  );
}

export default QuizListItem;
