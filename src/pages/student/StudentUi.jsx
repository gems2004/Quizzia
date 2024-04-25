import React from "react";
import QuizStartRequest from "../../components/QuizStartRequest";

function StudentUi() {
  return (
    <>
      <div className="card" style={{ maxWidth: "28rem" }}>
        <div className="card-body">
          <h5 className="card-title">إجراء اختبار</h5>
          <p className="card-text">
            قم بإدخال الرمز الذي ارسله لك استاذك كي تقوم ببدء حل الاختبار بعد
            قبول الطلب من قبل استاذك
          </p>
          <QuizStartRequest />
        </div>
      </div>
      <div className="card" style={{ maxWidth: "28rem" }}>
        <div className="card-body">
          <h5 className="card-title">معلومات</h5>
          <>
            <p className="card-text">
              بعض المعلومات البسيطة عن الحساب الشخصي للطالب وانجازاته.
            </p>
            <div className="list-group list-group-flush">
              <div className="list-group-item">
                عدد الاختبارات المُنجزة: <span className="text-muted">{}</span>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
}

export default StudentUi;
