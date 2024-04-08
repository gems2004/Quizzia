import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTeacherId } from "../../features/session/sessionSlice";
import { useGetUserByIdQuery } from "../../features/users/usersApiSlice";
import ErrorToken from "../../components/ErrorToken";

function TeacherUi() {
  const teacher_id = useSelector(selectTeacherId);
  const { data: info, isError, error } = useGetUserByIdQuery(teacher_id);

  if (isError && error.status === 401) return <ErrorToken />;
  return (
    <>
      <div className="card" style={{ maxWidth: "28rem" }}>
        <div className="card-body">
          <h5 className="card-title">اختبار</h5>
          <p className="card-text">
            هنا يمكنك انشاء اختبار جديد او تصفح قائمة الاختبارات المنشأة سابقاً.
          </p>
          <div className="d-flex gap-2 flex-wrap">
            <Link to="/quiz/create" className="btn btn-primary">
              انشاء اختبار
            </Link>
            <Link to="/quiz" className="btn btn-outline-primary">
              تصفح الاختبارات
            </Link>
          </div>
        </div>
      </div>
      <div className="card" style={{ maxWidth: "28rem" }}>
        <div className="card-body">
          <h5 className="card-title">معلومات</h5>
          <>
            <p className="card-text">
              بعض المعلومات البسيطة عن الحساب الشخصي للاستاذ وطلابه.
            </p>
            <div className="list-group list-group-flush">
              <div className="list-group-item">
                عدد الاختبارات المنشأة:{" "}
                <span className="text-muted">{info?.no_of_quizzes}</span>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
}

export default TeacherUi;
