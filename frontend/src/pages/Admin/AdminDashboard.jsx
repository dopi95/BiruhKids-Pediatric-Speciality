import { useState, useEffect } from "react";
import {
    Users,
    FileText,
    Play,
    MessageSquare,
    Mail,
    UserCheck,
    CalendarDays,
} from "lucide-react";
import resultService from "../../services/resultService";
import userService from "../../services/userService";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
    const { user, hasPermission } = useAuth();
    
    const allStats = [
        { icon: Users, label: "Registered Users", value: "0", color: "blue", permission: "userManagement" },
        { icon: UserCheck, label: "Doctors", value: "0", color: "green", permission: "doctorManagement" },
        { icon: FileText, label: "Results Submitted", value: "0", color: "orange", permission: "resultManagement" },
        { icon: MessageSquare, label: "Testimonials", value: "0", subValue: "0 today", color: "purple", permission: "testimonialManagement" },
        { icon: Mail, label: "Active Subscribers", value: "0", color: "pink", permission: "subscriberManagement" },
        { icon: Play, label: "Total Videos", value: "0", color: "red", permission: "videoManagement" },
        { icon: CalendarDays, label: "Appointments", value: "0", subValue: "0 today", color: "indigo", permission: "appointmentManagement" },
        { icon: FileText, label: "Total Services", value: "0", color: "teal", permission: "serviceManagement" },
    ];

    const allQuickActions = [
        { title: "Upload Results", link: "/admin/results", icon: FileText, color: "green", permission: "resultManagement" },
        { title: "Add Video", link: "/admin/videos/form", icon: Play, color: "red", permission: "videoManagement" },
        { title: "Review Testimonials", link: "/admin/testimonials", icon: MessageSquare, color: "yellow", permission: "testimonialManagement" },
        { title: "Manage Admins", link: "/admin/admins", icon: UserCheck, color: "pink", permission: "adminManagement" },
        { title: "Manage Appointments", link: "/admin/appointments", icon: CalendarDays, color: "indigo", permission: "appointmentManagement" },
        { title: "Manage Services", link: "/admin/services", icon: FileText, color: "teal", permission: "serviceManagement" },
    ];

    // Filter stats and actions based on user permissions
    const stats = user?.role === 'super_admin' 
        ? allStats 
        : user?.role === 'admin'
            ? allStats.filter(stat => hasPermission(stat.permission))
            : [];
    
    const quickActions = user?.role === 'super_admin'
        ? allQuickActions
        : user?.role === 'admin'
            ? allQuickActions.filter(action => hasPermission(action.permission))
            : [];
    
    // If admin has no permissions set, show basic dashboard items
    const hasAnyPermissions = user?.permissions && Object.values(user.permissions).some(p => p === true);
    const finalStats = (user?.role === 'admin' && !hasAnyPermissions) 
        ? allStats.slice(0, 4) // Show first 4 basic stats
        : stats;
    
    const finalQuickActions = (user?.role === 'admin' && !hasAnyPermissions)
        ? allQuickActions.slice(0, 3) // Show first 3 basic actions
        : quickActions;

    const [statsData, setStatsData] = useState(finalStats);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Helper function to check if a date is today
    const isToday = (date) => {
        if (!date) return false;
        const today = new Date();
        const checkDate = new Date(date);
        return (
            checkDate.getDate() === today.getDate() &&
            checkDate.getMonth() === today.getMonth() &&
            checkDate.getFullYear() === today.getFullYear()
        );
    };

    // Fetch dashboard data
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const newStats = [...statsData];
                
                // Fetch users and results stats
                try {
                    const [usersResponse, statsResponse] = await Promise.all([
                        userService.getUsers(),
                        resultService.getResultStats()
                    ]);
                    
                    // Update registered users count
                    if (usersResponse) {
                        let usersData = [];
                        if (Array.isArray(usersResponse)) {
                            usersData = usersResponse;
                        } else if (usersResponse.users) {
                            usersData = usersResponse.users;
                        }
                        const regularUsers = usersData.filter(user => user.role === 'user' || !user.role);
                        newStats[0].value = regularUsers.length.toString();
                    }
                    
                    // Update results count
                    if (statsResponse && statsResponse.stats) {
                        newStats[2].value = statsResponse.stats.totalResults.toString();
                    }
                } catch (err) {
                    console.error("Error fetching users/results stats:", err);
                }

                const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
                const token = localStorage.getItem('token');
                const headers = {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                };

                const [
                    doctorsResponse,
                    testimonialsResponse,
                    subscribersResponse,
                    videosResponse,
                    appointmentsResponse,
                    departmentsResponse
                ] = await Promise.allSettled([
                    fetch(`${baseUrl}/doctors`, { headers }),
                    fetch(`${baseUrl}/testimonials`, { headers }),
                    fetch(`${baseUrl}/subscribers/stats`, { headers }),
                    fetch(`${baseUrl}/videos`, { headers }),
                    fetch(`${baseUrl}/appointments`, { headers }),
                    fetch(`${baseUrl}/departments`, { headers })
                ]);

                // Doctors count
                if (doctorsResponse.status === "fulfilled" && doctorsResponse.value.ok) {
                    const data = await doctorsResponse.value.json();
                    if (data.success) newStats[1].value = data.data.length.toString();
                }

                // Testimonials count
                if (testimonialsResponse.status === "fulfilled" && testimonialsResponse.value.ok) {
                    const data = await testimonialsResponse.value.json();
                    if (data.success) {
                        const todaysTestimonials = data.data.filter(t => t.createdAt && isToday(t.createdAt)).length;
                        newStats[3].value = data.data.length.toString();
                        newStats[3].subValue = `${todaysTestimonials} today`;
                    }
                }

                // Subscribers count
                if (subscribersResponse.status === "fulfilled" && subscribersResponse.value.ok) {
                    const data = await subscribersResponse.value.json();
                    if (data.success) newStats[4].value = data.data.active.toString();
                }

                // Videos count
                if (videosResponse.status === "fulfilled" && videosResponse.value.ok) {
                    const data = await videosResponse.value.json();
                    if (data.success) newStats[5].value = data.data.length.toString();
                }

                // Appointments count
                if (appointmentsResponse.status === "fulfilled" && appointmentsResponse.value.ok) {
                    const data = await appointmentsResponse.value.json();
                    if (data.success) {
                        const todaysAppointments = data.data.filter(a => a.createdAt && isToday(a.createdAt)).length;
                        newStats[6].value = data.data.length.toString();
                        newStats[6].subValue = `${todaysAppointments} today`;
                    }
                }

                // Departments and Services count
                if (departmentsResponse.status === "fulfilled" && departmentsResponse.value.ok) {
                    const data = await departmentsResponse.value.json();
                    if (data.success) {
                        const totalServices = data.data.reduce((sum, dept) => sum + (dept.services?.length || 0), 0);
                        newStats[7].value = totalServices.toString();
                        // Update departments count if you want to add it
                        // newStats[8] = { label: "Total Departments", value: data.data.length.toString(), color: "indigo" };
                    }
                }

                setStatsData(newStats);
                setError(null);
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
                setError("Failed to load some dashboard data. Showing cached values.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="flex-1">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="px-6 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mt-14 md:mt-0">
                            Admin Dashboard
                        </h1>
                        <p className="text-gray-600 text-sm sm:text-base">
                            Welcome back! Here's what's happening at the clinic.
                        </p>
                    </div>
                </div>
            </div>

            {error && (
                <div className="mx-6 mt-6 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            {/* Show message for admins without permissions */}
            {user?.role === 'admin' && !hasAnyPermissions && (
                <div className="mx-6 mt-6 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
                    <p className="font-medium">Limited Access</p>
                    <p className="text-sm">Your admin account has limited permissions. Contact a Super Admin to grant you additional access rights.</p>
                </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-8 mx-6">
                {statsData.map((stat, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-start">
                            <div className={`p-3 rounded-full ${
                                stat.color === "blue" ? "bg-blue-100 text-blue-600" :
                                stat.color === "green" ? "bg-green-100 text-green-600" :
                                stat.color === "orange" ? "bg-orange-100 text-orange-600" :
                                stat.color === "purple" ? "bg-purple-100 text-purple-600" :
                                stat.color === "pink" ? "bg-pink-100 text-pink-600" :
                                stat.color === "red" ? "bg-red-100 text-red-600" :
                                "bg-teal-100 text-teal-600"
                            }`}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                                {stat.subValue ? (
                                    <div className="mt-1">
                                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                        <p className="text-sm text-gray-500">{stat.subValue}</p>
                                    </div>
                                ) : (
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="mx-6 p-6 bg-white rounded-lg shadow-sm">
                <div className="border-b border-gray-200 pb-4 mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Quick Actions
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {finalQuickActions.map((action, index) => (
                        <a
                            key={index}
                            href={action.link}
                            className="block p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200"
                        >
                            <div className="flex items-center mb-3">
                                <div
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                                        action.color === "green" ? "bg-green-100" :
                                        action.color === "red" ? "bg-red-100" :
                                        action.color === "yellow" ? "bg-yellow-100" :
                                        action.color === "purple" ? "bg-purple-100" :
                                        action.color === "pink" ? "bg-pink-100" :
                                        "bg-teal-100"
                                    }`}
                                >
                                    <action.icon
                                        className={`h-4 w-4 ${
                                            action.color === "green" ? "text-green-600" :
                                            action.color === "red" ? "text-red-600" :
                                            action.color === "yellow" ? "text-yellow-600" :
                                            action.color === "purple" ? "text-purple-600" :
                                            action.color === "pink" ? "text-pink-600" :
                                            "text-teal-600"
                                        }`}
                                    />
                                </div>
                                <h3 className="font-medium text-gray-900">
                                    {action.title}
                                </h3>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
