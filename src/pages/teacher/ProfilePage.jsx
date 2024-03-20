import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../../features/auth/authApiSlice";
import { apiSlice } from "../../features/api/apiSlice";
import {
  useEditUserMutation,
  useGetUserByIdQuery,
} from "../../features/users/usersApiSlice";
import Spinner from "../../components/Spinner";
import DeleteAccount from "../../components/DeleteAccount";
import { Form, Formik } from "formik";
import TextInput from "../../components/inputs/TextInput";
import ErrorToken from "../../components/ErrorToken";
import { useSelector } from "react-redux";
import { selectTeacherId } from "../../features/session/sessionSlice";

function ProfilePage() {
  const [logout] = useSendLogoutMutation();
  const [editTeacher] = useEditUserMutation();
  const teacher_id = useSelector(selectTeacherId);

  const {
    data: teacher,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetUserByIdQuery(teacher_id);

  const navigate = useNavigate();
  function handleLogout() {
    // logout();

    dispatch(apiSlice.util.resetApiState());
    localStorage.clear();
    navigate("/login");
  }

  if (isLoading) return <Spinner />;

  if (isSuccess) {
    return (
      <div className="my-4 container">
        <DeleteAccount />
        <div
          className="modal fade"
          id="editModal"
          tabIndex="-1"
          aria-labelledby="editModal"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <Formik
              initialValues={{ fullname: "", subject: "", password: "" }}
              onSubmit={async (values) => {
                editTeacher({
                  fullname: values.fullname,
                  subject: values.subject,
                  teacher_id: teacher_id,
                  user: {
                    username: teacher.user.username,
                    password: values.password,
                  },
                });
                // window.location.reload();
              }}
            >
              <Form className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="editModal">
                    تعديل معلومات حسابك
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <TextInput
                    label="الاسم"
                    name="fullname"
                    type="text"
                    placeholder="ادخل اسمك الشخصي"
                  />
                  <TextInput
                    label="المادة"
                    name="subject"
                    type="text"
                    placeholder="ادخل المادة"
                  />
                  <TextInput
                    label="كلمة المرور"
                    name="password"
                    type="password"
                    placeholder="ادخل كلمة المرور"
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
              </Form>
            </Formik>
          </div>
        </div>
        <div className="card">
          <div className="row g-0 align-items-center justify-content-center">
            <div className="col-md-4">
              <img
                className="d-block mx-auto"
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
                    <span className="text-muted">{teacher.fullname}</span>
                  </li>
                  <li className="list-group-item">
                    نوع الحساب:{" "}
                    <span className="text-muted">
                      {teacher.teacher_id ? "استاذ" : "Admin"}
                    </span>
                  </li>
                  <li className="list-group-item">
                    المادة:{" "}
                    <span className="text-muted">{teacher.subject}</span>
                  </li>

                  <li className="list-group-item">
                    نوع الاشتراك:{" "}
                    <span className="text-muted">
                      {teacher?.bundle_data?.name}
                    </span>
                    <Link to="/bundles" className="btn btn-success mx-4">
                      ترقية
                    </Link>
                  </li>
                  <li className="list-group-item">
                    عدد الاختبارات:{" "}
                    <span className="text-muted">{teacher.no_of_quizzes}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="my-4 d-flex gap-2 flex-wrap">
          <button
            className="btn btn-outline-primary"
            data-bs-toggle="modal"
            data-bs-target="#editModal"
          >
            تعديل المعلومات
          </button>

          <button
            className="btn btn-outline-danger"
            data-bs-toggle="modal"
            data-bs-target="#deleteModal"
          >
            حذف الحساب
          </button>
          <button className="btn btn-outline-secondary" onClick={handleLogout}>
            تسجيل خروج
          </button>
        </div>
      </div>
    );
  }

  if (isError && error.status === 401) return <ErrorToken />;
}

export default ProfilePage;
