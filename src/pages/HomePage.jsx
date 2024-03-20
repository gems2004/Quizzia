import React from "react";
import { Link } from "react-router-dom";
import { useGetUserByIdQuery } from "../features/users/usersApiSlice";
import ErrorToken from "../components/ErrorToken";
import {
  selectRole,
  selectTeacherId,
  selectUserId,
} from "../features/session/sessionSlice";
import { useSelector } from "react-redux";
import QuizStartRequest from "../components/QuizStartRequest";
import { useGetQuizRequestsQuery } from "../features/quizzes/quizApiSlice";

function HomePage() {
  const teacher_id = useSelector(selectTeacherId);
  const role = useSelector(selectRole);
  const { data: info, isError, error } = useGetUserByIdQuery(teacher_id);

  // const { data } = useGetQuizRequestsQuery();

  // console.log(data);

  if (isError && error.status === 401) return <ErrorToken />;

  return (
    <div className="my-4 container d-flex flex-column align-items-center gap-4">
      <div className="card" style={{ maxWidth: "28rem" }}>
        <div className="card-body">
          <h5 className="card-title">موقع كويزيا</h5>
          <p className="card-text">
            موقع لإنشاء إختبارات مدرسية مؤتمتة للمدرسين! نحن هنا لتقديم أدوات
            مفيدة لمساعدة المدرسين في إعداد اختباراتهم وتقييم أداء الطلاب. يهدف
            موقعنا إلى توفير بيئة سهلة الاستخدام وفعالة لإنشاء أسئلة اختبارات
            متنوعة ومناسبة لجميع المواد الدراسية.
          </p>
        </div>
      </div>
      {role === "Teacher" ? (
        <div className="card" style={{ maxWidth: "28rem" }}>
          <div className="card-body">
            <h5 className="card-title">اختبار</h5>
            <p className="card-text">
              هنا يمكنك انشاء اختبار جديد او تصفح قائمة الاختبارات المنشأة
              سابقاً.
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
      ) : (
        role === "Student" && (
          <div className="card" style={{ maxWidth: "28rem" }}>
            <div className="card-body">
              <h5 className="card-title">إجراء اختبار</h5>
              <p className="card-text">
                قم بإدخال الرمز الذي ارسله لك استاذك كي تقوم ببدء حل الاختبار
                بعد قبول الطلب من قبل استاذك
              </p>
              <QuizStartRequest />
            </div>
          </div>
        )
      )}
      {role === "" ? (
        <Link to="/admin" className="btn btn-outline-secondary">
          Admin Dashboard
        </Link>
      ) : (
        <div className="card" style={{ maxWidth: "28rem" }}>
          <div className="card-body">
            <h5 className="card-title">معلومات</h5>
            {role === "Student" ? (
              <>
                <p className="card-text">
                  بعض المعلومات البسيطة عن الحساب الشخصي للطالب وانجازاته.
                </p>
                <div className="list-group list-group-flush">
                  <div className="list-group-item">
                    عدد الاختبارات المُنجزة:{" "}
                    <span className="text-muted">{info?.no_of_quizzes}</span>
                  </div>
                </div>
              </>
            ) : (
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
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
