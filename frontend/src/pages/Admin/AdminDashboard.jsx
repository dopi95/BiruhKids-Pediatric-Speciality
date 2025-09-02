import StatsCard from "../../components/StatsCard";
import {
    Users,
    FileText,
    Play,
    MessageSquare,
    Mail,
    UserCheck,
    Calendar,
} from "lucide-react";

const AdminDashboard = () => {
    const stats = [
        {
            icon: Users,
            label: "Registered Users",
            value: "2,547",
            color: "blue",
        },
        {
            icon: UserCheck,
            label: "Doctors", // changed text
            value: "45",
            color: "green",
        },
        {
            icon: FileText,
            label: "Results Submitted",
            value: "1,284",
            color: "orange",
        },
        {
            icon: MessageSquare,
            label: "Testimonials",
            value: "389",
            color: "purple",
        },
        {
            icon: Mail,
            label: "Newsletter Subscribers",
            value: "8,923",
            color: "pink",
        },
        {
            icon: Calendar,
            label: "Appointments Today",
            value: "67",
            color: "indigo",
        },
    ];

    const quickActions = [
        // Removed Add New User
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

    return (
        <div className="flex-1">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="px-6 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mt-14 md:mt-0">
                            Admin Dashboard
                        </h1>
                        <p className="text-gray-600">
                            Welcome back! Here's what's happening at the clinic.
                        </p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">
                                Dr. Admin
                            </p>
                            <p className="text-xs text-gray-600">
                                Super Administrator
                            </p>
                        </div>
                        <img
                            src="https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
                            alt="Admin"
                            className="h-10 w-10 rounded-full"
                        />
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-8 mx-2">
                {stats.map((stat, i) => (
                    <StatsCard key={i} {...stat} icon={stat.icon} />
                ))}
            </div>

            {/* Quick Actions */}
            <div className="p-6 bg-white rounded-lg shadow-sm">
                <div className="border-b border-gray-200 pb-4 mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Quick Actions
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {quickActions.map((action, index) => (
                        <a
                            key={index}
                            href={action.link}
                            className="block p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200"
                        >
                            <div className="flex items-center mb-3">
                                <div
                                    className={`w-8 h-8 bg-${action.color}-100 rounded-lg flex items-center justify-center mr-3`}
                                >
                                    <action.icon
                                        className={`h-4 w-4 text-${action.color}-600`}
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
