import { useState, useEffect } from "react";
import { Building2, Stethoscope, Plus, Search } from "lucide-react";
import departmentService from "../../../services/departmentService";

export default function ServiceDashboard() {
    const [departments, setDepartments] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            setLoading(true);
            const response = await departmentService.getDepartments();
            setDepartments(response.data || []);
        } catch (error) {
            console.error("Error fetching departments:", error);
            // Fallback data
            setDepartments([
                {
                    id: 1,
                    title: "Cardiology",
                    description: "Heart and cardiovascular care for children",
                    services: [
                        { id: 1, name: "ECG Testing", description: "Electrocardiogram for heart monitoring" },
                        { id: 2, name: "Heart Surgery", description: "Pediatric cardiac surgical procedures" }
                    ]
                },
                {
                    id: 2,
                    title: "Neurology", 
                    description: "Brain and nervous system care",
                    services: [
                        { id: 3, name: "EEG Testing", description: "Brain wave monitoring" }
                    ]
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const filteredDepartments = departments.filter(dept =>
        dept.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dept.services?.some(service => 
            service.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    const totalServices = departments.reduce((sum, dept) => sum + (dept.services?.length || 0), 0);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Services Dashboard</h2>
                    <p className="text-gray-600">Overview of all departments and services</p>
                </div>
                <div className="flex items-center border rounded-lg overflow-hidden">
                    <input
                        type="text"
                        placeholder="Search departments or services..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-3 py-2 outline-none w-64"
                    />
                    <Search className="h-5 w-5 text-gray-400 mr-2" />
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center">
                        <div className="p-3 bg-blue-100 rounded-full">
                            <Building2 className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Total Departments</p>
                            <p className="text-2xl font-bold text-gray-900">{departments.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center">
                        <div className="p-3 bg-green-100 rounded-full">
                            <Stethoscope className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Total Services</p>
                            <p className="text-2xl font-bold text-gray-900">{totalServices}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center">
                        <div className="p-3 bg-purple-100 rounded-full">
                            <Plus className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Avg Services/Dept</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {departments.length > 0 ? Math.round(totalServices / departments.length) : 0}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Departments Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDepartments.map((dept) => (
                    <div key={dept.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{dept.title}</h3>
                                <p className="text-sm text-gray-600 mb-3">{dept.description}</p>
                                <div className="flex items-center">
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                        {dept.services?.length || 0} services
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Services List */}
                        <div className="space-y-2">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Services:</h4>
                            {!dept.services || dept.services.length === 0 ? (
                                <p className="text-xs text-gray-500 italic">No services available</p>
                            ) : (
                                <div className="space-y-1">
                                    {dept.services.slice(0, 3).map((service) => (
                                        <div key={service.id} className="text-sm text-gray-600 flex items-center">
                                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                                            {service.name}
                                        </div>
                                    ))}
                                    {dept.services.length > 3 && (
                                        <p className="text-xs text-gray-500 italic">
                                            +{dept.services.length - 3} more services
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {filteredDepartments.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No departments or services found</p>
                    <p className="text-gray-400 text-sm mt-2">Try adjusting your search query</p>
                </div>
            )}
        </div>
    );
}