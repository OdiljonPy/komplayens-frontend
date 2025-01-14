// src/layouts/AuthLayout.jsx
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;