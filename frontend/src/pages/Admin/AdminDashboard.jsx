import { useState, useEffect } from "react";
import StatsCard from "../../components/StatsCard";
import {
    Users,
    FileText,
    Play,
    MessageSquare,
    Mail,
    UserCheck,
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
    ]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const quickActions = [
        {
            title: "Upload Results",
            description: "Send test results to patients",
            link: "/admin/results",
            icon: FileText,
            color: "green",
        },
        {
            title: "Add Video",
            description: "Upload educational content",
            link: "/admin/videos/form",
            icon: Play,
            color: "red",
        },
        {
            title: "Review Testimonials",
            description: "Moderate patient feedback",
            link: "/admin/testimonials",
            icon: MessageSquare,
            color: "yellow",
        },
        {
            title: "Send Newsletter",
            description: "Email subscribers",
            link: "/admin/subscribers",
            icon: Mail,
            color: "purple",
        },
        {
            title: "Manage Admins",
            description: "Add or remove admin access",
            link: "/admin/admins",
            icon: UserCheck,
            color: "pink",
        },
    ];

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
                    videosResponse
                ] = await Promise.allSettled([
                    fetch(`${import.meta.env.VITE_API_BASE_URL}/doctors`),
                    fetch(`${import.meta.env.VITE_API_BASE_URL}/testimonials/stats`),
                    fetch(`${import.meta.env.VITE_API_BASE_URL}/subscribers/stats`),
                    fetch(`${import.meta.env.VITE_API_BASE_URL}/videos`)
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
                        newStats[3].value = data.data.total.toString();
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
                    <StatsCard key={i} {...stat} icon={stat.icon} />
                ))}
            </div>

            {/* Quick Actions */}
            <div className="mx-6 p-6 bg-white rounded-lg shadow-sm">
                <div className="border-b border-gray-200 pb-4 mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Quick Actions
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
                                            : "bg-pink-100"
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
                                                : "text-pink-600"
                                        }`}
                                    />
                                </div>
                                <h3 className="font-medium text-gray-900">
                                    {action.title}
                                </h3>
                            </div>
                            <p className="text-sm text-gray-600">
                                {action.description}
                            </p>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;