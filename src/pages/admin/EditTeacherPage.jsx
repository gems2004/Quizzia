import { Form, Formik } from "formik";
import React from "react";
import {
  useDeleteUserMutation,
  useEditUserMutation,
  useGetUserByIdQuery,
} from "../../features/users/usersApiSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import TextInput from "../../components/inputs/TextInput";
import Spinner from "../../components/Spinner";
import SelectInput from "../../components/inputs/SelectInput";
import { useDispatch } from "react-redux";

function EditTeacherPage() {
  const { user_id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: teacher, isLoading, isSuccess } = useGetUserByIdQuery(user_id);
  const [editUser] = useEditUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  function handleDelete() {
    navigate("/admin");
    dispatch(deleteUser(teacher.teacher_id));
  }

  if (isLoading) return <Spinner />;
  if (isSuccess)
    return (
      <div className="container my-4 py-4 h-100">
        <h4>تعديل معلومات الاستاذ:</h4>
        <section className="my-4">
          <Formik
            initialValues={{
              username: teacher.user.username,
              fullname: teacher.fullname,
              subject: teacher.subject,
            }}
            onSubmit={(values, { setSubmitting }) => {
              editUser({
                user: { username: values.username, id: teacher.teacher_id },
                fullname: values.fullname,
                subject: values.subject,
              });
            }}
          >
            <Form>
              <div className="row">
                <div className="col">
                  <TextInput
                    label="اسم المستخدم"
                    name="username"
                    type="text"
                    placeholder="ادخل اسم المستخدم"
                  />
                </div>
                <div className="col">
                  <TextInput
                    label="اسم الاستاذ"
                    name="fullname"
                    type="text"
                    placeholder="ادخل اسم الاستاذ"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <SelectInput label="المادة" name="subject">
                    <option value="">اختر المادة</option>
                    <option value="رياضيات">رياضيات</option>
                    <option value="عربي">عربي</option>
                    <option value="انكليزي">انكليزي</option>
                    <option value="علوم">علوم</option>
                  </SelectInput>
                </div>
              </div>
              <button type="submit" className="btn btn-outline-primary">
                تعديل الحساب
              </button>
              <button
                type="button"
                className="btn btn-danger mx-4"
                onClick={handleDelete}
              >
                حذف الحساب
              </button>
            </Form>
          </Formik>
          <Link
            to="/admin"
            className="btn btn-outline-secondary align-self-start mt-4"
          >
            العودة
          </Link>
        </section>
      </div>
    );
}

export default EditTeacherPage;
