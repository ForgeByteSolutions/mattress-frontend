import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const MonitoringMetrics = () => {
    const [activeTab, setActiveTab] = useState('accuracy');

    // Mock Data
    const accuracyData = [
        { day: 'Mon', gpt4: 94, claude: 92, llama: 88 },
        { day: 'Tue', gpt4: 95, claude: 93, llama: 89 },
        { day: 'Wed', gpt4: 94, claude: 94, llama: 88 },
        { day: 'Thu', gpt4: 96, claude: 95, llama: 90 },
        { day: 'Fri', gpt4: 95, claude: 94, llama: 91 },
        { day: 'Sat', gpt4: 97, claude: 96, llama: 92 },
        { day: 'Sun', gpt4: 96, claude: 95, llama: 91 },
    ];

    const latencyData = [
        { time: '00:00', avg: 450, p99: 1200 },
        { time: '04:00', avg: 420, p99: 900 },
        { time: '08:00', avg: 550, p99: 1500 },
        { time: '12:00', avg: 680, p99: 2100 },
        { time: '16:00', avg: 590, p99: 1800 },
        { time: '20:00', avg: 480, p99: 1100 },
    ];

    const throughputData = [
        { time: '00:00', requests: 1200 },
        { time: '04:00', requests: 800 },
        { time: '08:00', requests: 4500 },
        { time: '12:00', requests: 9800 },
        { time: '16:00', requests: 8500 },
        { time: '20:00', requests: 3400 },
    ];

    const errorData = [
        { time: '00:00', rate: 0.1 },
        { time: '04:00', rate: 0.05 },
        { time: '08:00', rate: 0.2 },
        { time: '12:00', rate: 0.8 },
        { time: '16:00', rate: 0.5 },
        { time: '20:00', rate: 0.2 },
    ];

    const tabs = [
        { id: 'accuracy', label: 'Model Accuracy' },
        { id: 'latency', label: 'Latency (ms)' },
        { id: 'throughput', label: 'Throughput' },
        { id: 'errors', label: 'Error Rate' },
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">System Monitoring</h2>
                    <p className="text-sm text-gray-500">Real-time performance metrics across all models.</p>
                </div>

                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === tab.id
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="w-full bg-gray-50 rounded-lg p-4 border border-gray-100" style={{ height: 340 }}>
                <ResponsiveContainer width="100%" height="100%">
                    {activeTab === 'accuracy' ? (
                        <LineChart data={accuracyData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="day" />
                            <YAxis domain={[80, 100]} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="gpt4" stroke="#3B82F6" strokeWidth={2} name="GPT-4" />
                            <Line type="monotone" dataKey="claude" stroke="#8B5CF6" strokeWidth={2} name="Claude 3" />
                            <Line type="monotone" dataKey="llama" stroke="#10B981" strokeWidth={2} name="Llama 3" />
                        </LineChart>
                    ) : activeTab === 'latency' ? (
                        <AreaChart data={latencyData}>
                            <defs>
                                <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Area type="monotone" dataKey="p99" stroke="#EF4444" strokeWidth={2} name="P99 Latency" fill="none" />
                            <Area type="monotone" dataKey="avg" stroke="#F59E0B" strokeWidth={2} name="Avg Latency" fill="url(#colorLatency)" />
                        </AreaChart>
                    ) : activeTab === 'throughput' ? (
                        <BarChart data={throughputData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="requests" name="Requests/min" fill="#10B981" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    ) : (
                        <AreaChart data={errorData}>
                            <defs>
                                <linearGradient id="colorError" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Area type="monotone" dataKey="rate" stroke="#EF4444" strokeWidth={2} name="Error Rate (%)" fill="url(#colorError)" />
                        </AreaChart>
                    )}
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default MonitoringMetrics;
