import React from "react";
import { selectRole } from "../features/session/sessionSlice";
import { useSelector } from "react-redux";
import AdminUi from "./admin/AdminUi";
import TeacherUi from "./teacher/TeacherUi";
import StudentUi from "./student/StudentUi";

function HomePage() {
  const role = useSelector(selectRole);

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
      {role === "" ? (
        <AdminUi />
      ) : role === "Teacher" ? (
        <TeacherUi />
      ) : (
        <StudentUi />
      )}
    </div>
  );
}

export default HomePage;
