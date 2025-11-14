import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow px-4 py-6 max-w-6xl mx-auto w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
