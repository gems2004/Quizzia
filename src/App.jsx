import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/teacher/ProfilePage";
import AboutPage from "./pages/AboutPage";
import BundlesPage from "./pages/BundlesPage";
import StudentPage from "./pages/student/StudentPage";
import QuizListPage from "./pages/teacher/QuizListPage";
import QuizCreatePage from "./pages/teacher/QuizCreatePage";
import QuizPage from "./pages/student/QuizPage";
import LoginPage from "./pages/LoginPage";
import CreateTeacherPage from "./pages/admin/CreateTeacherPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateBundlesPage from "./pages/admin/CreateBundlesPage";
import Prefetch from "./features/auth/Prefetch";
import Layout from "./pages/Layout";
import EditBundlePage from "./pages/admin/EditBundlePage";
import EditTeacherPage from "./pages/admin/EditTeacherPage";
import NotFound from "./components/NotFound";
import { useSelector } from "react-redux";
import { selectRole } from "./features/session/sessionSlice";
import QuizDetailsPage from "./pages/teacher/QuizDetailsPage";
import RegisterPage from "./pages/RegisterPage";
import QuizRequestPage from "./pages/teacher/QuizRequestPage";
import StudentRequestsPage from "./pages/student/StudentRequestsPage";

function App() {
  const role = useSelector(selectRole);

  return (
    <>
      <Prefetch />
      <Routes>
        <Route path="/admin">
          <Route index element={<AdminDashboard />} />
          <Route path="register" element={<CreateTeacherPage />} />
          <Route path="edit/:user_id" element={<EditTeacherPage />} />
          <Route path="bundle/new" element={<CreateBundlesPage />} />
          <Route path="bundle/edit/:bundle_id" element={<EditBundlePage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />

          {role === "Teacher" ? (
            <>
              <Route path="profile" element={<ProfilePage />} />
              <Route path="requests" element={<QuizRequestPage />} />
            </>
          ) : (
            <>
              <Route path="profile" element={<StudentPage />} />
              <Route path="requests" element={<StudentRequestsPage />} />
            </>
          )}

          <Route path="students">
            <Route path=":id" element={<StudentPage />} />
          </Route>

          <Route path="quiz">
            <Route index element={<QuizListPage />} />
            <Route path="create" element={<QuizCreatePage />} />
            {role === "Student" ? (
              <Route path=":id/:index" element={<QuizPage />} />
            ) : (
              <Route path=":id" element={<QuizDetailsPage />} />
            )}
          </Route>

          <Route path="about" element={<AboutPage />} />
          <Route path="bundles" element={<BundlesPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
