import React from 'react';

const MetricCard = ({ title, value, status, trend, trendValue, icon }) => {
    const statusColors = {
        good: 'bg-green-50 text-green-700 border-green-200',
        warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
        critical: 'bg-red-50 text-red-700 border-red-200',
        neutral: 'bg-gray-50 text-gray-700 border-gray-200',
    };

    const trendColors = {
        up: 'text-green-600',
        down: 'text-red-600',
        neutral: 'text-gray-500',
    };

    return (
        <div className={`p-6 rounded-xl border ${statusColors[status] || statusColors.neutral} shadow-sm transition-all hover:shadow-md`}>
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium opacity-80">{title}</p>
                    <h3 className="text-3xl font-bold mt-2">{value}</h3>
                </div>
                <div className="text-2xl opacity-70">{icon}</div>
            </div>
            {trend && (
                <div className="mt-4 flex items-center text-sm">
                    <span className={`font-medium ${trendColors[trend]}`}>
                        {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '•'} {trendValue}
                    </span>
                    <span className="ml-2 opacity-60">vs last month</span>
                </div>
            )}
        </div>
    );
};

const ExecutiveOverview = () => {
    const metrics = [
        {
            title: 'Compliance Score',
            value: '98%',
            status: 'good',
            trend: 'up',
            trendValue: '2.5%',
            icon: '',
        },
        {
            title: 'Monthly AI Cost',
            value: '$1,245',
            status: 'neutral',
            trend: 'up',
            trendValue: '12%',
            icon: '',
        },
        {
            title: 'Avg. Model Accuracy',
            value: '94.2%',
            status: 'good',
            trend: 'up',
            trendValue: '0.8%',
            icon: '',
        },
        {
            title: 'Active Alerts',
            value: '3',
            status: 'warning',
            trend: 'down',
            trendValue: '1',
            icon: '',
        },
    ];

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">Executive Overview</h2>
                    <p className="text-sm text-gray-500">Real-time snapshot of system health and performance.</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((metric, index) => (
                    <MetricCard key={index} {...metric} />
                ))}
            </div>
        </div>
    );
};

export default ExecutiveOverview;
