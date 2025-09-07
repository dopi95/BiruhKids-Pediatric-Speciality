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

const AdminDashboard = () => {
    const [stats, setStats] = useState([
        {
            icon: Users,
            label: "Registered Users",
            value: "0",
            color: "blue",
        },
        {
            icon: UserCheck,
            label: "Doctors",
            value: "0",
            color: "green",
        },
        {
            icon: FileText,
            label: "Results Submitted",
            value: "0",
            color: "orange",
        },
        {
            icon: MessageSquare,
            label: "Testimonials",
            value: "0",
            subValue: "0 today",
            color: "purple",
        },
        {
            icon: Mail,
            label: "Active Subscribers",
            value: "0",
            color: "pink",
        },
        {
            icon: Play,
            label: "Total Videos",
            value: "0",
            color: "red",
        },
        {
            icon: CalendarDays,
            label: "Appointments",
            value: "0",
            subValue: "0 today",
            color: "indigo",
        },
    ]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const quickActions = [
        {
            title: "Upload Results",
            link: "/admin/results",
            icon: FileText,
            color: "green",
        },
        {
            title: "Add Video",
            link: "/admin/videos/form",
            icon: Play,
            color: "red",
        },
        {
            title: "Review Testimonials",
            link: "/admin/testimonials",
            icon: MessageSquare,
            color: "yellow",
        },
        {
            title: "Send Newsletter",
            link: "/admin/subscribers",
            icon: Mail,
            color: "purple",
        },
        {
            title: "Manage Admins",
            link: "/admin/admins",
            icon: UserCheck,
            color: "pink",
        },
        {
            title: "Manage Appointments",
            link: "/admin/appointments",
            icon: CalendarDays,
            color: "indigo",
        },
    ];

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

                // Clone stats
                const newStats = [...stats];

                // Fetch other data in parallel
                const [
                    doctorsResponse,
                    testimonialsResponse,
                    subscribersResponse,
                    videosResponse,
                    appointmentsResponse
                ] = await Promise.allSettled([
                    fetch(`${import.meta.env.VITE_API_BASE_URL}/doctors`),
                    fetch(`${import.meta.env.VITE_API_BASE_URL}/testimonials`),
                    fetch(`${import.meta.env.VITE_API_BASE_URL}/subscribers/stats`),
                    fetch(`${import.meta.env.VITE_API_BASE_URL}/videos`),
                    fetch(`${import.meta.env.VITE_API_BASE_URL}/appointments`)
                ]);

                // Doctors count
                if (doctorsResponse.status === "fulfilled" && doctorsResponse.value.ok) {
                    const data = await doctorsResponse.value.json();
                    if (data.success) {
                        newStats[1].value = data.data.length.toString();
                    }
                }

                // Testimonials count
                if (testimonialsResponse.status === "fulfilled" && testimonialsResponse.value.ok) {
                    const data = await testimonialsResponse.value.json();
                    if (data.success) {
                        // Calculate today's testimonials
                        const todaysTestimonials = data.data.filter(testimonial => 
                            testimonial.createdAt && isToday(testimonial.createdAt)
                        ).length;
                        
                        // Update testimonials count with both total and today's
                        newStats[3].value = data.data.length.toString();
                        newStats[3].subValue = `${todaysTestimonials} today`;
                    }
                }

                // Subscribers count
                if (subscribersResponse.status === "fulfilled" && subscribersResponse.value.ok) {
                    const data = await subscribersResponse.value.json();
                    if (data.success) {
                        newStats[4].value = data.data.active.toString();
                    }
                }

                // Videos count
                if (videosResponse.status === "fulfilled" && videosResponse.value.ok) {
                    const data = await videosResponse.value.json();
                    if (data.success) {
                        newStats[5].value = data.data.length.toString();
                    }
                }

                // Appointments count
                if (appointmentsResponse.status === "fulfilled" && appointmentsResponse.value.ok) {
                    const data = await appointmentsResponse.value.json();
                    if (data.success) {
                        // Calculate today's appointments based on createdAt date
                        const todaysAppointments = data.data.filter(appointment => 
                            appointment.createdAt && isToday(appointment.createdAt)
                        ).length;
                        
                        // Update appointments count with both total and today's
                        newStats[6].value = data.data.length.toString();
                        newStats[6].subValue = `${todaysAppointments} today`;
                    }
                }

                setStats(newStats);
                setError(null);
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
                setError("Failed to load some dashboard data. Showing cached values.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-8 mx-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-start">
                            <div className={`p-3 rounded-full ${
                                stat.color === "blue" ? "bg-blue-100 text-blue-600" :
                                stat.color === "green" ? "bg-green-100 text-green-600" :
                                stat.color === "orange" ? "bg-orange-100 text-orange-600" :
                                stat.color === "purple" ? "bg-purple-100 text-purple-600" :
                                stat.color === "pink" ? "bg-pink-100 text-pink-600" :
                                stat.color === "red" ? "bg-red-100 text-red-600" :
                                "bg-indigo-100 text-indigo-600"
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
                    {quickActions.map((action, index) => (
                        <a
                            key={index}
                            href={action.link}
                            className="block p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200"
                        >
                            <div className="flex items-center mb-3">
                                <div
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                                        action.color === "green"
                                            ? "bg-green-100"
                                            : action.color === "red"
                                            ? "bg-red-100"
                                            : action.color === "yellow"
                                            ? "bg-yellow-100"
                                            : action.color === "purple"
                                            ? "bg-purple-100"
                                            : action.color === "pink"
                                            ? "bg-pink-100"
                                            : "bg-indigo-100"
                                    }`}
                                >
                                    <action.icon
                                        className={`h-4 w-4 ${
                                            action.color === "green"
                                                ? "text-green-600"
                                                : action.color === "red"
                                                ? "text-red-600"
                                                : action.color === "yellow"
                                                ? "text-yellow-600"
                                                : action.color === "purple"
                                                ? "text-purple-600"
                                                : action.color === "pink"
                                                ? "text-pink-600"
                                                : "text-indigo-600"
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