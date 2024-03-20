import React from "react";
import { Link } from "react-router-dom";

function UpgradePage({ quizLimit, currentQuizNum }) {
  return (
    <div className="container my-4">
      <h1>لا يمكنك إنشاء المزيد من الاختبارات!</h1>
      <p className="text-danger lead fw-semibold ">
        لقد قمت بإنشاء {currentQuizNum} اختبارات من اصل {quizLimit} اختبارات
        ممكنة
      </p>
      <p className="text-success fw-bold h5">
        <span>تحتاج إلى المزيد؟</span>
        <Link to="/bundles" className="text-success">
          قم بالترقية الاّن!
        </Link>
      </p>
    </div>
  );
}

export default UpgradePage;
