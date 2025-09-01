import React, { forwardRef } from "react";

const ServiceCard = forwardRef(
    (
        {
            icon: Icon,
            title,
            description,
            features = [],
            onEdit,
            onDelete,
            showActions = false,
            className = "",
        },
        ref
    ) => {
        return (
            <div
                ref={ref}
                className={`group bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${className}`}
            >
                <div className="p-8">
                    {/* Icon */}
                    {Icon && (
                        <div className="bg-gradient-to-r from-blue-100 to-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
                            <Icon className="h-8 w-8 text-blue-600 transition-transform duration-300 group-hover:translate-y-1" />
                        </div>
                    )}

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {title}
                    </h3>

                    {/* Description */}
                    {description && (
                        <p className="text-gray-600 mb-6">{description}</p>
                    )}

                    {/* Features */}
                    {features.length > 0 && (
                        <div className="space-y-2 mb-6">
                            {features.map((feature, i) => (
                                <div
                                    key={i}
                                    className="flex items-center text-sm text-gray-500"
                                >
                                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                                    {feature}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Actions (admin only) */}
                    {showActions && (
                        <div className="flex space-x-3 mt-4">
                            <button
                                onClick={onEdit}
                                className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Edit
                            </button>
                            <button
                                onClick={onDelete}
                                className="text-red-600 hover:text-red-800 font-medium"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }
);

export default ServiceCard;
