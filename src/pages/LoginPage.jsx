import React from "react";
import { Form, Formik } from "formik";
import TextInput from "../components/inputs/TextInput";
import { useLoginMutation } from "../features/auth/authApiSlice";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import InputErrorMessage from "../components/inputs/InputErrorMessage";
import Alert from "../components/Alert";
import { useDispatch } from "react-redux";
import { setSessionData } from "../features/session/sessionSlice";
import { jwtDecode } from "jwt-decode";

const SignInSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "اسم المستخدم لا يجب ان يكون اقل من 3 حروف")
    .max(15, "اسم المستخدم لا يجب ان يكون اكثر من 15 حرف")
    .required("لا يجب ان يكون الحقل فارغ"),
  password: Yup.string()
    .min(8, "كلمة السر لا يجب ان تكون اقل من 8 حروف")
    .max(32, "كلمة السر لا يجب ان تكون اكثر من 32 حرف")
    .required("لا يجب ان يكون الحقل فارغ"),
});

function LoginPage() {
  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="container ps-5 login">
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={SignInSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const tokens = await login(values).unwrap();
            localStorage.setItem("refresh", tokens.refresh);
            localStorage.setItem("access", tokens.access);
            // dispatch(setSessionData(jwtDecode(localStorage.getItem("access"))));
            navigate("/");
          } catch (err) {
            console.log(err);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className="pe-4">
            <h4 className="h3 mb-4 fw-normal">الرجاء تسجيل الدخول</h4>
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
              تسجيل دخول
            </button>
            <p className="my-3">
              <small>
                اهنالك مشكلة؟{" "}
                <a href="tel:+09999999" className="text-reset">
                  تواصل معنا
                </a>
              </small>
            </p>
            <Link to="/register">ليس لديك حساب؟ انشئ حساب طالب الاّن!</Link>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginPage;
