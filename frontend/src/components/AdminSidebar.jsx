import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    FileText,
    Play,
    MessageSquare,
    Mail,
    UserCog,
    User,
    LogOut,
    Stethoscope,
    BriefcaseMedical,
    CalendarDays,
    Globe,
    Menu,
    X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const AdminSidebar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const { user, hasPermission, logout } = useAuth();

    const isActive = (path) => location.pathname === path;

    const allMenuItems = [
        { path: "/admin", icon: LayoutDashboard, label: "Dashboard", permission: "dashboard" },
        { path: "/admin/users", icon: Users, label: "Users", permission: "userManagement" },
        { path: "/admin/results", icon: FileText, label: "Results", permission: "resultManagement" },
        { path: "/admin/doctors", icon: Stethoscope, label: "Doctors", permission: "doctorManagement" },
        { path: "/admin/services", icon: BriefcaseMedical, label: "Services", permission: "serviceManagement" },
        {
            path: "/admin/appointments",
            icon: CalendarDays,
            label: "Appointments",
            permission: "appointmentManagement"
        },
        { path: "/admin/videos", icon: Play, label: "Videos", permission: "videoManagement" },
        {
            path: "/admin/testimonials",
            icon: MessageSquare,
            label: "Testimonials",
            permission: "testimonialManagement"
        },
        { path: "/admin/subscribers", icon: Mail, label: "Subscribers", permission: "subscriberManagement" },
        { path: "/admin/admins", icon: UserCog, label: "Admins", permission: "adminManagement" },
        { path: "/admin/profile", icon: User, label: "Profile", permission: null }, // Always visible
    ];

    // Filter menu items based on user permissions
    const menuItems = allMenuItems.filter(item => 
        !item.permission || hasPermission(item.permission)
    );

    const handleLogout = () => {
        logout();
    };

    return (
        <>
            {/* Mobile Topbar */}
            <div className="md:hidden fixed top-0 left-0 w-full bg-gray-900 text-white flex items-center justify-between px-4 py-3 z-50">
                <button onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </button>
                <span className="text-lg font-bold">Admin Panel</span>
                <div className="flex items-center space-x-4">
                    <div className="text-right">
                        <p className="text-sm font-medium text-gray-50">
                            {user?.name || 'Admin'}
                        </p>
                        <p className="text-xs text-gray-200">
                            {user?.role === 'super_admin' ? 'Super Administrator' : 'Administrator'}
                        </p>
                    </div>
                    <img
                        src={user?.avatar || "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"}
                        alt="Admin"
                        className="h-10 w-10 rounded-full"
                    />
                </div>
            </div>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-80 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}
            >
                {/* Logo (Desktop only) */}
                <div className="hidden md:flex md:justify-between md:items-center p-4 border-b border-gray-800">
                    <span className="text-lg font-bold">Admin Panel</span>
                    <div className="flex items-center space-x-4">
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-50">
                                {user?.name || 'Admin'}
                            </p>
                            <p className="text-xs text-gray-200">
                                {user?.role === 'super_admin' ? 'Super Administrator' : 'Administrator'}
                            </p>
                        </div>
                        <img
                            src={user?.avatar || "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"}
                            alt="Admin"
                            className="h-10 w-10 rounded-full"
                        />
                    </div>
                </div>

                {/* Menu */}
                <nav className="flex-1 overflow-y-auto mt-14 md:mt-0 pb-1 sm:pb-2">
                    <ul className="space-y-1 p-3">
                        {menuItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center space-x-2 px-3 py-2 rounded-md sm:text-sm transition-colors duration-200 ${
                                        isActive(item.path)
                                            ? "bg-blue-600 text-white"
                                            : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                    }`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <item.icon className="h-4 w-4" />
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Footer */}
                <div className="flex-shrink-0 p-3 border-t border-gray-800 space-y-1 md:mb-2">
                    <Link
                        to="/"
                        className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white rounded-md transition-colors duration-200"
                        onClick={() => setIsOpen(false)}
                    >
                        <Globe className="h-4 w-4" />
                        <span>Back To Website</span>
                    </Link>
                    <button
                        onClick={() => {
                            handleLogout();
                            setIsOpen(false);
                        }}
                        className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white rounded-md transition-colors duration-200 w-full text-left"
                    >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            {/* Spacer for topbar (mobile only) */}
            <div className="md:ml-80 mt-14 md:mt-0"></div>
        </>
    );
};

export default AdminSidebar;
