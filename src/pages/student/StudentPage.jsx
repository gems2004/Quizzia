import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeleteStudentMutation,
  useEditStudentNameMutation,
  useGetStudentByIdQuery,
} from "../../features/students/studentsApiSlice";
import Spinner from "../../components/Spinner";
import { useSelector, useDispatch } from "react-redux";
import DeleteAccount from "../../components/DeleteAccount";
import ErrorToken from "../../components/ErrorToken";
import { selectStudentId } from "../../features/session/sessionSlice";
import { apiSlice } from "../../features/api/apiSlice";

function StudentPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const student_id = useSelector(selectStudentId);

  const [editedName, setEditedName] = useState("");

  const {
    data: student,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetStudentByIdQuery(student_id);

  const [editStudentName] = useEditStudentNameMutation();
  const [deleteStudent] = useDeleteStudentMutation();

  async function handleEditName(e) {
    e.preventDefault();
    await editStudentName({
      student_id,
      fullname: editedName,
    });
  }
  async function handleDelete() {
    await deleteStudent(student_id);
    localStorage.clear();
    dispatch(apiSlice.util.resetApiState());
    navigate("/login");
  }

  if (isLoading) return <Spinner />;

  if (isSuccess) {
    return (
      <div className="container">
        <DeleteAccount handleDelete={handleDelete} />
        <div
          className="modal fade"
          id="editNameModal"
          tabIndex="-1"
          aria-labelledby="editNameModal"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <form className="modal-content" onSubmit={handleEditName}>
              <div className="modal-header">
                <h5 className="modal-title" id="editNameModal">
                  تعديل اسم الطالب
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <label htmlFor="editName" className="form-label">
                  الاسم الجديد:
                </label>
                <input
                  id="editName"
                  name="editName"
                  className="form-control"
                  type="text"
                  placeholder="ادخل الاسم"
                  aria-label="Edit Name"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  data-bs-dismiss="modal"
                >
                  إلغاء
                </button>
                <button type="submit" className="btn btn-success">
                  حفظ
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="card">
          <div className="row g-0 align-items-center justify-content-center">
            <div className="col-md-4">
              <img
                className="mx-auto d-block "
                width="200px"
                src="/person-1.png"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">الحساب الشخصي</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    الاسم:{" "}
                    <span className="text-muted">{student?.fullname}</span>
                    <button
                      className="btn btn-success mx-4"
                      data-bs-toggle="modal"
                      data-bs-target="#editNameModal"
                    >
                      تعديل
                    </button>
                  </li>
                  <li className="list-group-item">
                    رقم الطالب: <span className="text-muted">{student_id}</span>
                  </li>
                  <li className="list-group-item">
                    نوع الحساب: <span className="text-muted">طالب</span>
                  </li>
                  <li className="list-group-item">
                    عدد الاختبارات المنجزة:{" "}
                    <span className="text-muted">
                      {student?.no_of_quizzes_done}
                    </span>
                  </li>
                  <li className="list-group-item">
                    معدل العلامات: <span className="text-muted">55/60</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="my-4 d-flex gap-2 flex-wrap">
          <button
            className="btn btn-outline-danger"
            data-bs-toggle="modal"
            data-bs-target="#deleteModal"
          >
            حذف الحساب
          </button>
        </div>
      </div>
    );
  }
  if (isError && error.status === 401) return <ErrorToken />;
}

export default StudentPage;
