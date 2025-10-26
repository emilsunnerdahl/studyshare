import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";

import Landing from "./pages/Landing";
import Program from "./pages/Program";
import Programs from "./pages/Programs";
import CourseDetail from "./pages/CourseDetail";
import ReviewForm from "./pages/ReviewForm";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import SetNewPassword from "./pages/SetNewPassword";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <div className="relative">
          {/* <Background />  */}
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/programs/:program" element={<Program />} />
              <Route
                path="/programs/:program/:code"
                element={<CourseDetail />}
              />
              <Route
                path="/programs/:program/:code/review"
                element={<ReviewForm />}
              />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/auth" element={<Auth />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/set-new-password" element={<SetNewPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

function Background() {
  return (
    <>
      {/* pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20 -z-10"
        style={{
          backgroundImage: "url('/randomShapes.svg')",
          backgroundRepeat: "repeat",
          backgroundPosition: "top left",
          backgroundSize: "120px",
        }}
      />

      {/* vertical gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/10 via-black/20 to-transparent -z-10" />

      {/* top fade */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-t from-transparent to-black/40 -z-10" />

      {/* subtle horizontal blue side gradient */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(to right, 
            rgba(191,219,254,0.15), 
            rgba(255,255,255,0), 
            rgba(255,255,255,0), 
            rgba(191,219,254,0.15))`,
        }}
      />
    </>
  );
}

export default App;
