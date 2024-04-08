import React from "react";
import { useGetStudentRequestQuery } from "../../features/quizzes/quizApiSlice";
import moment from "moment";

function StudentRequestsPage() {
  const { data: requests } = useGetStudentRequestQuery();
  console.log(requests);
  return (
    <div className="container my-4">
      <h4 className="my-4">قائمة الطلبات:</h4>
      {requests <= 0 ? (
        <p className="lead">لا يوجد طلبات</p>
      ) : (
        <div className="list-group">
          {requests?.map((request) => {
            const request_date = moment(request.created_at);
            const now = moment();
            const dif = now.diff(request_date, "minutes");
            return (
              <div
                className="list-group-item d-flex align-items-center justify-content-around "
                key={request.id}
              >
                <p className="mb-0">
                  اسم الاختبار:
                  <span className="text-muted"> {request.quiz_data.name}</span>
                </p>
                <p className="mb-0">
                  المدة:
                  <span className="text-muted">
                    {" "}
                    {request.quiz_data.req_time} دقيقة
                  </span>
                </p>
                <p className="mb-0">
                  منذ:
                  <span className="text-muted"> {dif} دقيقة</span>
                </p>
                <p className="mb-0">
                  الحالة:
                  <span
                    className={
                      request.approved
                        ? "text-success"
                        : request.approved === false
                        ? "text-danger"
                        : "text-warning"
                    }
                  >
                    {" "}
                    {request.approved
                      ? "مقبول"
                      : request.approved === false
                      ? "مرفوض"
                      : "بإنتظار القبول"}
                  </span>
                </p>
                <button
                  className={`btn ${
                    !request.approved
                      ? "disabled btn-outline-secondary"
                      : "btn-outline-success"
                  }`}
                >
                  بدء الاختبار
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default StudentRequestsPage;
