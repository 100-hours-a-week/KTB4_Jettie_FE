import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage.jsx";
import PostsPage from "../pages/PostsPage.jsx";
import SignupPage from "../pages/SignupPage.jsx";
import PostCreatePage from "../pages/PostCreatePage.jsx";
import PostPage from "../pages/PostPage.jsx";
import PostUpdatePage from "../pages/PostUpdatePage.jsx";
import MyPostPage from "../pages/MyPostPage.jsx";
import UserUpdatePage from "../pages/UserUpdatePage.jsx";
import PasswordUpdatePage from "../pages/PasswordUpdatePage.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import useAuth from "../hooks/useAuth.js";

function RootRedirect() {
  const { authenticated } = useAuth();

  return (
    <Navigate
      to={authenticated ? "/posts" : "/login"}
      replace
    />
  );
}

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<RootRedirect />}
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/posts" element={<PostsPage />} />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/posts/:postId"
            element={<PostPage />}
          />

          <Route
            path="/posts/:postId/edit"
            element={<PostUpdatePage />}
          />

          <Route
            path="/posts/create"
            element={<PostCreatePage />}
          />

          <Route
            path="/users/me"
            element={<UserUpdatePage />}
          />

          <Route
            path="/users/me/password"
            element={<PasswordUpdatePage />}
          />

          <Route
            path="/users/me/posts"
            element={<MyPostPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
