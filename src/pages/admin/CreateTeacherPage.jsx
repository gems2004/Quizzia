import React from "react";
import { Form, Formik } from "formik";
import { useCreateUserMutation } from "../../features/users/usersApiSlice";
import TextInput from "../../components/inputs/TextInput";
import SelectInput from "../../components/inputs/SelectInput";
import { Link } from "react-router-dom";
import Alert from "../../components/Alert";
import * as Yup from "yup";
import InputErrorMessage from "../../components/inputs/InputErrorMessage";

const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "اسم المستخدم لا يجب ان يكون اقل من 3 حروف")
    .max(15, "اسم المستخدم لا يجب ان يكون اكثر من 15 حرف")
    .required("لا يجب ان يكون الحقل فارغ"),
  password: Yup.string()
    .min(8, "كلمة السر لا يجب ان تكون اقل من 8 حروف")
    .max(32, "كلمة السر لا يجب ان تكون اكثر من 32 حرف")
    .required("لا يجب ان يكون الحقل فارغ"),
  fullname: Yup.string().required("لا يجب ان يكون الحقل فارغ"),
  subject: Yup.string().required("لا يجب ان يكون الحقل فارغ"),
});

function CreateTeacherPage() {
  const [addNewUser, { isError, isLoading, isSuccess, error }] =
    useCreateUserMutation();

  return (
    <div className="container my-4 d-flex flex-column justify-content-center align-items-center h-100">
      <h4 className="mb-4">إنشاء حساب جديد:</h4>
      {isError && <InputErrorMessage message={error?.data?.user?.username} />}
      <Formik
        initialValues={{
          username: "",
          password: "",
          fullname: "",
          subject: "",
        }}
        validationSchema={SignUpSchema}
        onSubmit={(values, { setSubmitting }) => {
          addNewUser({
            user: { username: values.username, password: values.password },
            fullname: values.fullname,
            subject: values.subject,
          });
          setSubmitting(false);
        }}
      >
        {({ errors, touched }) => (
          <Form className="w-100">
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
            <div className="row">
              <div className="col">
                {errors.fullname && touched.fullname && (
                  <InputErrorMessage message={errors.fullname} />
                )}
                <TextInput
                  label="الاسم الشخصي"
                  name="fullname"
                  type="text"
                  placeholder="ادخل اسم المدرس"
                />
              </div>
              {/* <div className="col">
              <SelectInput label="الباقة" name="fk_bundle">
                <option value={1}>مجاني</option>
                <option value={2}>برونزي</option>
                <option value={3}>فضي</option>
                <option value={2}>ذهبي</option>
              </SelectInput>
            </div> */}
              <div className="col">
                {errors.subject && touched.subject && (
                  <InputErrorMessage message={errors.subject} />
                )}
                <SelectInput label="المادة" name="subject">
                  <option value="">اختر المادة</option>
                  <option value="رياضيات">رياضيات</option>
                  <option value="عربي">عربي</option>
                  <option value="انكليزي">انكليزي</option>
                  <option value="علوم">علوم</option>
                </SelectInput>
              </div>
            </div>
            <button
              type="submit"
              className={`btn ${
                errors.username ||
                errors.password ||
                errors.fullname ||
                errors.subject ||
                isLoading
                  ? "disabled btn-outline-secondary"
                  : "btn-outline-primary"
              }`}
            >
              إنشاء حساب
            </button>
          </Form>
        )}
      </Formik>
      {isSuccess && (
        <Alert color="success" removable={true} label="تمت اضافة استاذ جديد" />
      )}
      <Link
        to="/admin"
        className="btn btn-outline-secondary align-self-start mt-4"
      >
        العودة
      </Link>
    </div>
  );
}

export default CreateTeacherPage;
