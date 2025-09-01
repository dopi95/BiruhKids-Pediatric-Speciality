const colorMap = {
    blue: "blue",
    green: "green",
    purple: "purple",
    red: "red",
};

export default function StatsCard({
    label,
    value,
    color = "blue",
    icon: Icon,
}) {
    const bgColor = `bg-${colorMap[color]}-100`;
    const textColor = `text-${colorMap[color]}-600`;

    return (
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 flex-shrink-0 w-full">
            <div className="flex items-center justify-between">
                <div className="truncate">
                    <p className="text-sm font-medium text-gray-600 mb-1 truncate">
                        {label}
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">
                        {value}
                    </p>
                </div>
                <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 ${bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}
                >
                    {Icon && (
                        <Icon
                            className={`h-5 w-5 sm:h-6 sm:w-6 ${textColor}`}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
