import { useState } from "react";
import { Search, FileText, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StatsCard from "../../components/StatsCard";

const ResultManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const stats = [
        {
            label: "Total Results",
            value: "1,284",
            color: "blue",
            icon: FileText,
        },
    ];

    const patients = [
        {
            id: 1,
            name: "John Smith",
            phone: "+2519345678",
            email: "john.smith@email.com",
        },
        {
            id: 2,
            name: "Sarah Johnson",
            phone: "+251 11 234 5678",
            email: "sarah.j@email.com",
        },
        {
            id: 3,
            name: "Michael Brown",
            phone: "+251 11 345 6789",
            email: "michael.brown@email.com",
        },
        {
            id: 4,
            name: "Emily Davis",
            phone: "+251 11 456 7890",
            email: "emily.davis@email.com",
        },
        {
            id: 5,
            name: "David Wilson",
            phone: "+251 11 567 8901",
            email: "david.wilson@email.com",
        },
    ];

    const filteredPatients = patients.filter((patient) => {
        const searchLower = searchTerm.toLowerCase();
        return (
            patient.name.toLowerCase().includes(searchLower) ||
            patient.phone.includes(searchTerm) ||
            patient.email.toLowerCase().includes(searchLower)
        );
    });

    const handleSendResult = (patient) => {
        navigate("/admin/results/form", { state: { patient } });
    };

    return (
        <div className="flex-1 pt-14 md:pt-0">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="px-4 md:px-6 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                            Result Management
                        </h1>
                        <p className="text-gray-600 text-sm md:text-base">
                            Upload and send results to patients
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-4 md:p-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {stats.map((stat, i) => (
                        <StatsCard key={i} {...stat} icon={stat.icon} />
                    ))}
                </div>

                {/* Search */}
                <div className="bg-white rounded-lg shadow-sm mb-6 p-4 md:p-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search patients by name, phone, or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm md:text-base"
                        />
                    </div>
                </div>

                {/* Patients */}
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-4 md:p-6 border-b border-gray-200">
                        <h2 className="text-base md:text-lg font-semibold text-gray-900">
                            Patients ({filteredPatients.length})
                        </h2>
                        <p className="text-xs md:text-sm text-gray-600">
                            Click "Send Result" to upload and send results
                        </p>
                    </div>

                    {/* Table (desktop) */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Patient
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Contact
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredPatients.map((patient) => (
                                    <tr
                                        key={patient.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap flex items-center">
                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                <span className="text-blue-600 font-semibold">
                                                    {patient.name.charAt(0)}
                                                </span>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {patient.name}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {patient.phone}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {patient.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() =>
                                                    handleSendResult(patient)
                                                }
                                                className="inline-flex items-center px-3 py-2 rounded-md transition-colors duration-200 text-white bg-blue-600 hover:bg-blue-700"
                                            >
                                                <Send className="h-3 w-3 mr-1" />
                                                Send Result
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Cards (mobile) */}
                    <div className="md:hidden p-4 space-y-4">
                        {filteredPatients.map((patient) => (
                            <div
                                key={patient.id}
                                className="border rounded-lg p-4 shadow-sm bg-white"
                            >
                                <div className="flex items-center mb-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-blue-600 font-semibold">
                                            {patient.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div className="ml-3">
                                        <p className="font-semibold text-gray-900 text-sm">
                                            {patient.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {patient.email}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-sm">
                                    <span className="font-medium">Phone:</span>{" "}
                                    {patient.phone}
                                </p>

                                <button
                                    onClick={() => handleSendResult(patient)}
                                    className="mt-3 w-full flex items-center justify-center px-3 py-2 rounded-md text-sm transition-colors duration-200 text-white bg-blue-600 hover:bg-blue-700"
                                >
                                    <Send className="h-3 w-3 mr-1" />
                                    Send Result
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultManagement;
