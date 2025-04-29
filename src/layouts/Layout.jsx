import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="  py-8 mx-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;