import { Route, Routes } from "react-router-dom";

import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";

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
      </Route>
    </Routes>
  );
}

export default App;
