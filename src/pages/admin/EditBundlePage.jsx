import React from "react";
import {
  useDeleteBundleMutation,
  useEditBundleMutation,
  useGetBundleByIdQuery,
} from "../../features/bundles/bundlesApiSlice";
import Spinner from "../../components/Spinner";
import { Link, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import TextInput from "../../components/inputs/TextInput";
import Alert from "../../components/Alert";
import { useDispatch } from "react-redux";
import InputErrorMessage from "../../components/inputs/InputErrorMessage";

function EditBundlePage() {
  const { bundle_id } = useParams();
  const {
    data: bundle,
    isSuccess,
    isLoading,
  } = useGetBundleByIdQuery(bundle_id);

  const dispatch = useDispatch();

  const [editBundle, { isSuccess: isEditSuccess, isError, error }] =
    useEditBundleMutation();
  const [deleteBundle] = useDeleteBundleMutation();

  if (isLoading) return <Spinner />;

  if (isSuccess) {
    return (
      <div className="container my-4 py-4 h-100">
        <h4>تعديل معلومات الباقة:</h4>

        <section>
          <Formik
            initialValues={{
              name: bundle.name,
              price: bundle.price,
              no_of_questions: bundle.no_of_questions,
              no_of_students: 0,
              no_of_quizzes: 0,
            }}
            onSubmit={async (values, { setSubmitting }) => {
              await dispatch(editBundle({ ...values, id: bundle_id }));
              setSubmitting(false);
            }}
          >
            <Form className="my-4">
              {isError && <InputErrorMessage message={error.data.name} />}
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

              <button type="submit" className="btn btn-outline-success">
                تعديل الباقة
              </button>
              <button
                type="button"
                className="btn btn-danger ms-4"
                onClick={() => deleteBundle(bundle_id)}
              >
                حذف الباقة
              </button>
              {isEditSuccess && (
                <Alert
                  color="success"
                  label="تم تعديل الباقة بنجاح"
                  removable={true}
                />
              )}
            </Form>
          </Formik>
          <Link to="/admin" className="btn btn-outline-secondary">
            عودة
          </Link>
        </section>
      </div>
    );
  }
}

export default EditBundlePage;
