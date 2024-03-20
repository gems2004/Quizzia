// import React from "react";
// import StudentListItem from "../components/StudentListItem";
// import { Formik, Form } from "formik";
// import {
//   useCreateNewStudentMutation,
//   useGetAllStudentsQuery,
// } from "../features/students/studentsApiSlice";
// import TextInput from "../components/inputs/TextInput";
// import { useSelector } from "react-redux";
// import Spinner from "../components/Spinner";
// import ErrorToken from "../components/ErrorToken";
// import { selectTeacherId } from "../features/session/sessionSlice";

// function StudentsListPage() {
//   const teacher_id = useSelector(selectTeacherId);
//   const {
//     data: students,
//     isLoading,
//     isSuccess: isGetAllStudentsSuccess,
//     isError,
//     error,
//   } = useGetAllStudentsQuery(teacher_id);
//   const [addStudent, { isSuccess: isAddNewStudentSuccess }] =
//     useCreateNewStudentMutation();

//   let content;

//   if (isLoading) content = <Spinner />; // spinner here

//   if (isError && error.status === 401) return <ErrorToken />;

//   if (isGetAllStudentsSuccess) {
//     if (students?.ids?.length === 0)
//       content = <h5 className="my-4">لا يوجد طلاب</h5>;
//     else {
//       content = (
//         <div className="list-group">
//           {Object.entries(students?.entities).map(([key, value]) => (
//             <StudentListItem
//               key={value.id}
//               id={value.id}
//               name={value.fullname}
//             />
//           ))}
//         </div>
//       );
//     }
//   }

//   return (
//     <div className="container my-4">
//       <div
//         className="modal fade"
//         id="addStudentModal"
//         tabIndex="-1"
//         aria-labelledby="addStudentAccountModal"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id="addStudentAccountModal">
//                 إضافة طالب
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <Formik
//               initialValues={{ studentName: "" }}
//               onSubmit={(values, { setSubmitting }) => {
//                 addStudent({ ...values, teacher_id });
//                 setSubmitting(false);
//               }}
//             >
//               <Form>
//                 <div className="modal-body ms-4">
//                   <TextInput
//                     label="اسم الطالب"
//                     name="studentName"
//                     type="text"
//                     placeholder="ادخل اسم الطالب"
//                     required
//                   />
//                 </div>
//                 <div className="modal-footer">
//                   <button
//                     type="button"
//                     className="btn btn-outline-danger"
//                     data-bs-dismiss="modal"
//                   >
//                     إغلاق
//                   </button>
//                   <button
//                     type="submit"
//                     className="btn btn-success"
//                     data-bs-dismiss="modal"
//                   >
//                     إضافة
//                   </button>
//                 </div>
//               </Form>
//             </Formik>
//           </div>
//         </div>
//       </div>
//       <h4>قائمة الطلاب:</h4>
//       {content}
//       <button
//         className="btn btn-outline-success mt-4"
//         data-bs-toggle="modal"
//         data-bs-target="#addStudentModal"
//       >
//         اضافة طالب
//       </button>
//     </div>
//   );
// }

// export default StudentsListPage;
