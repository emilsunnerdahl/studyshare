import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Menu, X, Home, Users, ArrowLeftToLine, BookCheck } from "lucide-react";

interface NavItem {
  name: string;
  icon: React.ElementType;
  path: string;
}

const navItems: NavItem[] = [
  { name: "Dashboard", icon: Home, path: "/admin/dashboard" },
  { name: "Users", icon: Users, path: "/admin/users" },
  { name: "Reviews", icon: BookCheck, path: "/admin/reviews" }
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-white text-gray-900">
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-30 transition-opacity md:hidden ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 transform bg-gray-50 border-r border-gray-200 
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">Studyshare Admin</h1>
          <button
            className="md:hidden p-2 hover:bg-gray-200 rounded-lg"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map(({ name, icon: Icon, path }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) =>
                `flex items-center w-full gap-3 p-2 rounded-lg transition
                ${
                  isActive
                    ? "bg-blue-100 text-blue-600"
                    : "hover:bg-gray-200 text-gray-700"
                }`
              }
              onClick={() => setSidebarOpen(false)} // closes on mobile
            >
              <Icon size={18} />
              <span>{name}</span>
            </NavLink>
          ))}
        </nav>

        {/* button to go back to main site */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <a
            href="/"
            className="flex items-center justify-center gap-2 p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            <ArrowLeftToLine />
            <span>Studyshare.se</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar (mobile) */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white md:hidden">
          <button
            className="p-2 hover:bg-gray-200 rounded-lg"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>
          <h2 className="font-semibold text-gray-900">Admin</h2>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
