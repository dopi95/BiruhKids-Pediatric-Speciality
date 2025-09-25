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
                
                const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
                const token = localStorage.getItem('token');
                const headers = {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                };

                // Only fetch data for endpoints the user has permission to access
                const fetchPromises = [];
                const endpointMap = [];

                // Users and results stats (if has userManagement or resultManagement)
                if (user?.role === 'super_admin' || hasPermission('userManagement')) {
                    fetchPromises.push(userService.getUsers().catch(() => null));
                    endpointMap.push({ type: 'users', index: 0 });
                }
                
                if (user?.role === 'super_admin' || hasPermission('resultManagement')) {
                    fetchPromises.push(resultService.getResultStats().catch(() => null));
                    endpointMap.push({ type: 'results', index: 2 });
                }

                // API endpoints with permission checks
                if (user?.role === 'super_admin' || hasPermission('doctorManagement')) {
                    fetchPromises.push(fetch(`${baseUrl}/doctors`, { headers }).catch(() => null));
                    endpointMap.push({ type: 'doctors', index: 1 });
                }

                if (user?.role === 'super_admin' || hasPermission('testimonialManagement')) {
                    fetchPromises.push(fetch(`${baseUrl}/testimonials`, { headers }).catch(() => null));
                    endpointMap.push({ type: 'testimonials', index: 3 });
                }

                if (user?.role === 'super_admin' || hasPermission('subscriberManagement')) {
                    fetchPromises.push(fetch(`${baseUrl}/subscribers/stats`, { headers }).catch(() => null));
                    endpointMap.push({ type: 'subscribers', index: 4 });
                }

                if (user?.role === 'super_admin' || hasPermission('videoManagement')) {
                    fetchPromises.push(fetch(`${baseUrl}/videos`, { headers }).catch(() => null));
                    endpointMap.push({ type: 'videos', index: 5 });
                }

                if (user?.role === 'super_admin' || hasPermission('appointmentManagement')) {
                    fetchPromises.push(fetch(`${baseUrl}/appointments`, { headers }).catch(() => null));
                    endpointMap.push({ type: 'appointments', index: 6 });
                }

                if (user?.role === 'super_admin' || hasPermission('serviceManagement')) {
                    fetchPromises.push(fetch(`${baseUrl}/departments`, { headers }).catch(() => null));
                    endpointMap.push({ type: 'services', index: 7 });
                }

                const responses = await Promise.allSettled(fetchPromises);

                // Process responses
                for (let i = 0; i < responses.length; i++) {
                    const response = responses[i];
                    const endpoint = endpointMap[i];
                    
                    if (response.status === 'fulfilled' && response.value) {
                        try {
                            if (endpoint.type === 'users' && response.value) {
                                let usersData = [];
                                if (Array.isArray(response.value)) {
                                    usersData = response.value;
                                } else if (response.value.users) {
                                    usersData = response.value.users;
                                }
                                const regularUsers = usersData.filter(user => user.role === 'user' || !user.role);
                                newStats[endpoint.index].value = regularUsers.length.toString();
                            } else if (endpoint.type === 'results' && response.value?.stats) {
                                newStats[endpoint.index].value = response.value.stats.totalResults.toString();
                            } else if (response.value.ok) {
                                const data = await response.value.json();
                                if (data.success) {
                                    switch (endpoint.type) {
                                        case 'doctors':
                                            newStats[endpoint.index].value = data.data.length.toString();
                                            break;
                                        case 'testimonials':
                                            const todaysTestimonials = data.data.filter(t => t.createdAt && isToday(t.createdAt)).length;
                                            newStats[endpoint.index].value = data.data.length.toString();
                                            newStats[endpoint.index].subValue = `${todaysTestimonials} today`;
                                            break;
                                        case 'subscribers':
                                            newStats[endpoint.index].value = data.data.active.toString();
                                            break;
                                        case 'videos':
                                            newStats[endpoint.index].value = data.data.length.toString();
                                            break;
                                        case 'appointments':
                                            const todaysAppointments = data.data.filter(a => a.createdAt && isToday(a.createdAt)).length;
                                            newStats[endpoint.index].value = data.data.length.toString();
                                            newStats[endpoint.index].subValue = `${todaysAppointments} today`;
                                            break;
                                        case 'services':
                                            // Count total services across all departments
                                            const totalServices = data.data.reduce((total, department) => {
                                                return total + (department.services ? department.services.length : 0);
                                            }, 0);
                                            newStats[endpoint.index].value = totalServices.toString();
                                            break;
                                    }
                                }
                            }
                        } catch (err) {
                            console.error(`Error processing ${endpoint.type} data:`, err);
                        }
                    }
                }

                setStatsData(newStats);
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
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
