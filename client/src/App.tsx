import { Route, Routes } from "react-router-dom";

import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";

import DashboardPage from "@/pages/dashboard";
import BoardPage from "@/pages/board";

import Profile from "@/pages/profile";

import GuestRoute from "@/routes/GuestRoute";
import ProtectedRoute from "@/routes/ProtectedRoute";

function App() {
  return (
    <Routes>

      <Route element={<HomePage />} path="/" />

      <Route element={<GuestRoute />}>
         <Route element={<LoginPage />} path="/login" />
         <Route element={<RegisterPage />} path="/register" />
      </Route>

      <Route element={<ProtectedRoute />}>
         <Route element={<DashboardPage />} path="/u/boards" />
         <Route element={<BoardPage />} path="/u/boards/:id" />
         <Route element={<Profile />} path="/u/profile" />
      </Route>
    </Routes>
  );
}

export default App;
