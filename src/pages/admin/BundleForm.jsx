import { Formik, Form } from "formik";
import React from "react";
import TextInput from "../../components/inputs/TextInput";
import Alert from "../../components/Alert";

function BundleForm({ submitAction, btnLabel, alertLabel, isSuccess, id }) {
  return (
    <Formik
      initialValues={{
        name: "",
        price: 0,
        no_of_questions: 0,
        no_of_students: 0,
        no_of_quizzes: 0,
      }}
      onSubmit={async (values, { setSubmitting }) => {
        submitAction({ ...values, id });
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
            <TextInput label="عدد الطلاب" name="no_of_students" type="number" />
          </div>
        </div>

        <button type="submit" className="btn btn-outline-primary">
          {btnLabel}
        </button>
        {isSuccess && (
          <Alert color="success" label={alertLabel} removable={true} />
        )}
      </Form>
    </Formik>
  );
}

export default BundleForm;
