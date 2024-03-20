import React from "react";
import { Form, Formik } from "formik";
import TextInput from "../components/inputs/TextInput";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import InputErrorMessage from "../components/inputs/InputErrorMessage";
import Alert from "../components/Alert";
import { useCreateNewStudentMutation } from "../features/auth/authApiSlice";
import { setSessionData } from "../features/session/sessionSlice";
import { jwtDecode } from "jwt-decode";

const SignInSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "اسم المستخدم لا يجب ان يكون اقل من 3 حروف")
    .max(15, "اسم المستخدم لا يجب ان يكون اكثر من 15 حرف")
    .required("لا يجب ان يكون الحقل فارغ"),
  fullname: Yup.string()
    .min(1, "اسمك الشخصي لا يجب ان يكون اقل من 1 حرف")
    .max(20, "اسمك لا يجب ان يكون اكثر من 20 حرف")
    .required("لا يجب ان يكون الحقل فارغ"),
  password: Yup.string()
    .min(8, "كلمة السر لا يجب ان تكون اقل من 8 حروف")
    .max(32, "كلمة السر لا يجب ان تكون اكثر من 32 حرف")
    .required("لا يجب ان يكون الحقل فارغ"),
});

function RegisterPage() {
  const [createNewStudent, { isLoading, isSuccess, isError, error }] =
    useCreateNewStudentMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="container ps-5 login">
      <Formik
        initialValues={{ username: "", password: "", fullname: "" }}
        validationSchema={SignInSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            createNewStudent({ ...values });
            navigate("/login");
          } catch (err) {
            console.log(err);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className="pe-4">
            <h4 className="h3 mb-4 fw-normal">إنشاء حساب طالب</h4>
            {errors.username && touched.username && (
              <InputErrorMessage message={errors.username} />
            )}
            <TextInput
              label="اسم المستخدم"
              name="username"
              type="text"
              placeholder="ادخل اسم المستخدم"
            />
            {errors.password && touched.password && (
              <InputErrorMessage message={errors.password} />
            )}
            <TextInput
              label="اسم الطالب"
              name="fullname"
              type="text"
              placeholder="ادخل اسمك الشخصي"
            />
            {isError && error.status === 401 && (
              <Alert
                label="لا يوجد مستخدم مطابق للبيانات المدخلة"
                color="danger small"
                removable={false}
              />
            )}
            <TextInput
              label="كلمة السر"
              name="password"
              type="password"
              placeholder="ادخل كلمة السر"
            />
            {isError && error.status === 401 && (
              <Alert
                label="لا يوجد مستخدم مطابق للبيانات المدخلة"
                color="danger small"
                removable={false}
              />
            )}
            <button
              type="submit"
              className={`btn ${
                isLoading || errors.password || errors.username
                  ? "disabled btn-outline-secondary"
                  : "btn-outline-primary"
              }`}
            >
              إنشاء حساب
            </button>
            <p className="my-3">
              <small>
                اهنالك مشكلة؟{" "}
                <a href="tel:+09999999" className="text-reset">
                  تواصل معنا
                </a>
              </small>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default RegisterPage;
