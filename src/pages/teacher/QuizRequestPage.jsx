import React, { useEffect } from "react";
import { useGetQuizRequestsQuery } from "../../features/quizzes/quizApiSlice";
import QuizRequestItem from "../../components/QuizRequestItem";
import moment from "moment/moment";
import Spinner from "../../components/Spinner";

function QuizRequestPage() {
  const { data: requests, isLoading, refetch } = useGetQuizRequestsQuery();
  console.log(requests);

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <section className="container my-4">
      <h4 className="my-4">قائمة طلبات الاختبارات</h4>

      <div className="list-group">
        {requests?.map((request) => {
          const request_date = moment(request.created_at);
          const now = moment();
          const dif = now.diff(request_date, "minutes");
          return (
            <QuizRequestItem
              key={request.id}
              student_name={request.student_data.fullname}
              student_id={request.student_data.id}
              quiz_name={request.quiz_data.name}
              since={dif}
              token={request.quiz_data.quiz_token}
              isApproved={request.approved}
            />
          );
        })}
      </div>
    </section>
  );
}

export default QuizRequestPage;
