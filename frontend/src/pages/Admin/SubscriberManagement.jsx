import { useState } from "react";
import { Mail, Send, Search, Filter, Calendar } from "lucide-react";
import StatsCard from "../../components/StatsCard";

const SubscriberManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSubscribers, setSelectedSubscribers] = useState([]);

    const stats = [
        {
            label: "Total Subscribers",
            value: "8,923",
            color: "blue",
        },
        {
            label: "Active Subscribers",
            value: "8,645",
            color: "green",
        },
        { label: "Unsubscribed", value: "278", color: "red" },
    ];

    const subscribers = [
        {
            id: 1,
            email: "john.smith@email.com",
            subscribedAt: "2025-01-08",
            status: "Active",
        },
        {
            id: 2,
            email: "sarah.j@email.com",
            subscribedAt: "2025-01-07",
            status: "Active",
        },
        {
            id: 3,
            email: "michael.brown@email.com",
            subscribedAt: "2025-01-06",
            status: "Active",
        },
        {
            id: 4,
            email: "emily.davis@email.com",
            subscribedAt: "2025-01-05",
            status: "Unsubscribed",
        },
        {
            id: 5,
            email: "david.wilson@email.com",
            subscribedAt: "2025-01-04",
            status: "Active",
        },
    ];

    const filteredSubscribers = subscribers.filter((subscriber) => {
        return subscriber.email
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
    });

    const handleSelectAll = () => {
        if (selectedSubscribers.length === filteredSubscribers.length) {
            setSelectedSubscribers([]);
        } else {
            setSelectedSubscribers(filteredSubscribers.map((sub) => sub.id));
        }
    };

    const handleSelectSubscriber = (subscriberId) => {
        setSelectedSubscribers((prev) =>
            prev.includes(subscriberId)
                ? prev.filter((id) => id !== subscriberId)
                : [...prev, subscriberId]
        );
    };

    const handleSendNewsletter = () => {
        if (selectedSubscribers.length === 0) {
            alert("Please select at least one subscriber");
            return;
        }
        console.log("Send newsletter to:", selectedSubscribers);
        alert(
            `Newsletter will be sent to ${selectedSubscribers.length} subscribers`
        );
    };

    return (
        <div className="flex-1">
            {/* Header */}
            <div className="bg-white border-b shadow-sm mt-14 sm:mt-0">
                <div className="px-6 py-4 flex flex-col gap-4 sm:flex-row items-center justify-between">
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                            Subscriber Management
                        </h1>
                        <p className="text-gray-600 text:sm sm:text-base">
                            Manage newsletter subscribers and email campaigns
                        </p>
                    </div>

                    <button
                        onClick={handleSendNewsletter}
                        className="w-full sm:max-w-[250px] bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex justify-center items-center"
                    >
                        <Send className="w-4 h-4 mr-2" />
                        Send Newsletter
                    </button>
                </div>
            </div>

            <div className="p-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-8">
                    {stats.map((stat, i) => (
                        <StatsCard key={i} {...stat} icon={Mail} />
                    ))}
                </div>

                {/* Newsletter Compose Section */}
                <div className="mb-6 bg-white rounded-lg shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Newsletter Campaign
                        </h2>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="subject"
                                    className="block mb-2 text-sm font-medium text-gray-700"
                                >
                                    Email Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                    placeholder="Enter newsletter subject"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="template"
                                    className="block mb-2 text-sm font-medium text-gray-700"
                                >
                                    Email Template
                                </label>
                                <select
                                    id="template"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                >
                                    <option value="">Select template</option>
                                    <option value="health-tips">
                                        Health Tips Newsletter
                                    </option>
                                    <option value="clinic-updates">
                                        Clinic Updates
                                    </option>
                                    <option value="appointment-reminders">
                                        Appointment Reminders
                                    </option>
                                    <option value="wellness-content">
                                        Wellness Content
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="content"
                                className="block mb-2 text-sm font-medium text-gray-700"
                            >
                                Email Content
                            </label>
                            <textarea
                                id="content"
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-blue-500"
                                placeholder="Enter your newsletter content here..."
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="mb-6 bg-white rounded-lg shadow-sm">
                    <div className="p-6">
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <div className="relative flex-1">
                                <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                                <input
                                    type="text"
                                    placeholder="Search subscribers by email..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className="flex items-center space-x-4">
                                <Filter className="w-4 h-4 text-gray-600" />
                                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
                                    <option value="all">All Subscribers</option>
                                    <option value="active">Active Only</option>
                                    <option value="unsubscribed">
                                        Unsubscribed
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Subscribers Table */}
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Subscribers ({filteredSubscribers.length})
                            </h2>
                            <div className="text-sm text-gray-600">
                                {selectedSubscribers.length > 0 && (
                                    <span>
                                        {selectedSubscribers.length} selected
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left">
                                        <input
                                            type="checkbox"
                                            checked={
                                                selectedSubscribers.length ===
                                                    filteredSubscribers.length &&
                                                filteredSubscribers.length > 0
                                            }
                                            onChange={handleSelectAll}
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                    </th>
                                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                        Subscribed
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredSubscribers.map((subscriber) => (
                                    <tr
                                        key={subscriber.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="checkbox"
                                                checked={selectedSubscribers.includes(
                                                    subscriber.id
                                                )}
                                                onChange={() =>
                                                    handleSelectSubscriber(
                                                        subscriber.id
                                                    )
                                                }
                                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex items-center justify-center w-8 h-8 mr-3 bg-blue-100 rounded-full">
                                                    <Mail className="w-4 h-4 text-blue-600" />
                                                </div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {subscriber.email}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    subscriber.status ===
                                                    "Active"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-red-100 text-red-800"
                                                }`}
                                            >
                                                {subscriber.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <Calendar className="w-4 h-4 mr-1" />
                                                {subscriber.subscribedAt}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriberManagement;
