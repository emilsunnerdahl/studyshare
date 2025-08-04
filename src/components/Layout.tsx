import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
    return (
        <div>
            <Navbar />
            <main className="px-4 py-6 max-w-6xl mx-auto">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
