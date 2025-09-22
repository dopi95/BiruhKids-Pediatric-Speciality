export default function StatsCard({ label, value, color, icon: Icon }) {
    const colorMap = {
        blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
        green: { bg: 'bg-green-100', text: 'text-green-600' },
        yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
        red: { bg: 'bg-red-100', text: 'text-red-600' }
    };

    const colors = colorMap[color] || colorMap.blue;

    return (
        <div className="bg-white rounded-lg shadow-sm p-4 flex-shrink-0 w-full">
            <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-600 mb-1 truncate">
                        {label}
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                        {value}
                    </p>
                </div>
                <div
                    className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center flex-shrink-0 ml-3`}
                >
                    {Icon && (
                        <Icon
                            className={`h-5 w-5 ${colors.text}`}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
