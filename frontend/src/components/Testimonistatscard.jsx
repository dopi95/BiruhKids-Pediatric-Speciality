import React from "react";

const StatsCard = ({ label, value, color, icon: Icon, className = "" }) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-600",
    red: "bg-red-100 text-red-600",
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${colorClasses[color]}`}>
          {Icon && <Icon className="h-6 w-6" />}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;