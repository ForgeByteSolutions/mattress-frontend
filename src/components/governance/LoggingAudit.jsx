import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LoggingAudit = () => {
    // Mock data for the chart
    const data = [
        { time: '00:00', requests: 120, errors: 2 },
        { time: '04:00', requests: 80, errors: 0 },
        { time: '08:00', requests: 450, errors: 5 },
        { time: '12:00', requests: 980, errors: 12 },
        { time: '16:00', requests: 850, errors: 8 },
        { time: '20:00', requests: 340, errors: 3 },
        { time: '23:59', requests: 150, errors: 1 },
    ];

    const logs = [
        { id: 1, action: 'Prompt Injection Detected', user: 'System Guard', time: '10 mins ago', status: 'Blocked', color: 'text-red-600 bg-red-50' },
        { id: 2, action: 'Model Update: GPT-4o', user: 'Admin User', time: '2 hours ago', status: 'Success', color: 'text-green-600 bg-green-50' },
        { id: 3, action: 'High Latency Warning', user: 'Monitor', time: '5 hours ago', status: 'Warning', color: 'text-yellow-600 bg-yellow-50' },
        { id: 4, action: 'New API Key Generated', user: 'Dev Team', time: '1 day ago', status: 'Success', color: 'text-blue-600 bg-blue-50' },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart Section */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">Request Volume & Traffic</h2>
                    <select className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Last 24 Hours</option>
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                    </select>
                </div>
                <div style={{ width: '100%', height: 270 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                            />
                            <Area type="monotone" dataKey="requests" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorRequests)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Logs Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Audit Log</h2>
                <div className="space-y-4">
                    {logs.map((log) => (
                        <div key={log.id} className="flex items-start pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">{log.action}</p>
                                <div className="flex justify-between items-center mt-1">
                                    <span className="text-xs text-gray-500">{log.user} • {log.time}</span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${log.color}`}>
                                        {log.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="w-full mt-4 text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View All Logs →
                </button>
            </div>
        </div>
    );
};

export default LoggingAudit;
