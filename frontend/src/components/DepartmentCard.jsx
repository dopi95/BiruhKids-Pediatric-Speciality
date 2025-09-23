import { useState } from "react";
import { ChevronDown, ChevronRight, Edit, Trash2, Plus } from "lucide-react";

export default function DepartmentCard({ 
    department, 
    onEditDepartment, 
    onDeleteDepartment, 
    onAddService, 
    onEditService, 
    onDeleteService 
}) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Department Header */}
            <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="mr-3 p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                            {isExpanded ? 
                                <ChevronDown className="h-4 w-4 text-gray-600" /> : 
                                <ChevronRight className="h-4 w-4 text-gray-600" />
                            }
                        </button>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">{department.title_en || department.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{department.description_en || department.description}</p>
                            <div className="flex items-center mt-2 space-x-4">
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                    {department.services?.length || 0} services
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                        <button
                            onClick={() => onAddService(department._id)}
                            className="bg-green-600 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm hover:bg-green-700 transition-colors flex items-center whitespace-nowrap"
                        >
                            <Plus className="h-3 w-3 mr-1" />
                            <span className="hidden sm:inline">Add Service</span>
                            <span className="sm:hidden">Add</span>
                        </button>
                        <button
                            onClick={() => onEditDepartment(department)}
                            className="text-blue-600 hover:text-blue-800 p-1 sm:p-2 transition-colors"
                        >
                            <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                        <button
                            onClick={() => onDeleteDepartment(department)}
                            className="text-red-600 hover:text-red-800 p-1 sm:p-2 transition-colors"
                        >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Services List */}
            {isExpanded && (
                <div className="p-4 bg-gray-50">
                    {!department.services || department.services.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500 mb-4">No services in this department yet</p>
                            <button
                                onClick={() => onAddService(department._id)}
                                className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm sm:text-base"
                            >
                                <span className="hidden sm:inline">Add First Service</span>
                                <span className="sm:hidden">Add Service</span>
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <h4 className="font-medium text-gray-900 mb-3">Services in this department:</h4>
                            {department.services.map((service) => (
                                <div key={service.id} className="bg-white p-3 rounded border border-gray-200 flex justify-between items-start">
                                    <div className="flex-1">
                                        <h5 className="font-medium text-gray-900">{service.name_en || service.name}</h5>
                                    </div>
                                    <div className="flex space-x-2 ml-4">
                                        <button
                                            onClick={() => onEditService(service, department._id)}
                                            className="text-blue-600 hover:text-blue-800 p-1 transition-colors"
                                        >
                                            <Edit className="h-3 w-3" />
                                        </button>
                                        <button
                                            onClick={() => onDeleteService(service)}
                                            className="text-red-600 hover:text-red-800 p-1 transition-colors"
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}