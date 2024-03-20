import { Field, Form, Formik } from "formik";
import React from "react";
import TextInput from "../../components/inputs/TextInput";
import { useCreateNewBundleMutation } from "../../features/bundles/bundlesApiSlice";
import Alert from "../../components/Alert";
import { Link } from "react-router-dom";

function CreateBundlesPage() {
  const [addNewBundle, { isError, isLoading, isSuccess, error }] =
    useCreateNewBundleMutation();

  return (
    <div className="container my-4">
      <h4>إنشاء باقة جديدة:</h4>
      <Formik
        initialValues={{
          name: "",
          price: 0,
          no_of_questions: 0,
          no_of_students: 0,
          no_of_quizzes: 0,
        }}
        onSubmit={async (values, { setSubmitting }) => {
          await addNewBundle({ ...values });
          setSubmitting(false);
        }}
      >
        <Form className="my-4">
          <div className="row">
            <TextInput
              label="الاسم"
              name="name"
              type="text"
              placeholder="ادخل اسم الباقة"
            />
          </div>
          <div className="row">
            <div className="col">
              <TextInput label="السعر" name="price" type="number" />
            </div>
            <div className="col">
              <TextInput
                label="عدد الاسئلة"
                name="no_of_questions"
                type="number"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <TextInput
                label="عدد الاختبارات"
                name="no_of_quizzes"
                type="number"
              />
            </div>
            <div className="col">
              <TextInput
                label="عدد الطلاب"
                name="no_of_students"
                type="number"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-outline-primary">
            انشاء باقة
          </button>
          <Link
            to="/admin"
            className="btn btn-outline-secondary align-self-start mx-4"
          >
            العودة
          </Link>
          {isSuccess && (
            <Alert
              color="success"
              label="تمت اضافة باقة جديدة"
              removable={true}
            />
          )}
        </Form>
      </Formik>
    </div>
  );
}

export default CreateBundlesPage;
