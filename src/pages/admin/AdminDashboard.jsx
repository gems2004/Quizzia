import React from "react";
import { Link } from "react-router-dom";
import { useGetAllTeachersQuery } from "../../features/users/usersApiSlice";
import {
  useDeleteBundleMutation,
  useGetAllBundlesQuery,
} from "../../features/bundles/bundlesApiSlice";
import { useDispatch } from "react-redux";
import Forbidden from "../../components/Forbidden";

function AdminDashboard() {
  const { data: teachers, isError, error } = useGetAllTeachersQuery();
  const { data: bundles } = useGetAllBundlesQuery();

  const [deleteBundle] = useDeleteBundleMutation();
  const dispatch = useDispatch();

  if (isError && error.status === 403) return <Forbidden />;

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center h-100">
      <h4>Admin Dashboard</h4>
      <section className="my-4 w-100 table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#U</th>
              <th>#T</th>
              <th>Username</th>
              <th>Fullname</th>
              <th>Subject</th>
              <th>Students</th>
              <th>Quizzes</th>
              <th>Bundle</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {teachers?.map((teacher) => {
              return (
                <tr key={teacher.teacher_id}>
                  <th scope="row">{teacher.user.user_id}</th>
                  <th scope="row">{teacher.teacher_id}</th>
                  <td>{teacher.user.username}</td>
                  <td>{teacher.fullname}</td>
                  <td>{teacher.subject}</td>
                  <td>{teacher.no_of_students}</td>
                  <td>{teacher.no_of_quizzes}</td>
                  <td>{teacher.bundle_data.name}</td>
                  <td>
                    <Link to={`edit/${teacher.teacher_id}`}>
                      <img src="/assets/edit.svg" width="20px" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
      <section className="my-4 w-100 table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Questions</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {bundles?.map((bundle) => {
              return (
                <tr key={bundle.id}>
                  <th scope="row">{bundle.id}</th>
                  <td>{bundle.name}</td>
                  <td>{bundle.price} s.p</td>
                  <td>{bundle.no_of_questions}</td>
                  <td>
                    <Link to={`bundle/edit/${bundle.id}`}>
                      <img src="/assets/edit.svg" width="20px" />
                    </Link>
                  </td>
                  <td>
                    <img
                      src="/assets/delete.svg"
                      width="20px"
                      className="pointer"
                      onClick={() => dispatch(deleteBundle(bundle.id))}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
      <section className="d-flex justify-content-evenly align-items-center mt-5 w-100">
        <Link to="register" className="btn btn-outline-primary">
          Add New Teacher
        </Link>
        <Link to="bundle/new" className="btn btn-outline-dark">
          Add New Bundle
        </Link>
        <Link to="/" className="btn btn-outline-secondary">
          Home Page
        </Link>
      </section>
    </div>
  );
}

export default AdminDashboard;
