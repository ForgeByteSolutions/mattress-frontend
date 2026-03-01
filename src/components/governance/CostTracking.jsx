import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CostTracking = () => {
    // Mock Data
    const costData = [
        { month: 'Jan', openai: 400, anthropic: 240, azure: 100 },
        { month: 'Feb', openai: 450, anthropic: 280, azure: 120 },
        { month: 'Mar', openai: 420, anthropic: 300, azure: 110 },
        { month: 'Apr', openai: 500, anthropic: 350, azure: 140 },
        { month: 'May', openai: 550, anthropic: 400, azure: 160 },
        { month: 'Jun', openai: 600, anthropic: 420, azure: 180 },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Stats Column */}
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
                    <h3 className="text-gray-500 text-sm font-medium">Total Spend (YTD)</h3>
                    <div className="flex items-baseline mt-2">
                        <span className="text-3xl font-bold text-gray-900">$5,820</span>
                        <span className="ml-2 text-sm text-green-600 font-medium">+12% vs last year</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
                    <h3 className="text-gray-500 text-sm font-medium">Forecast (Next Month)</h3>
                    <div className="flex items-baseline mt-2">
                        <span className="text-3xl font-bold text-gray-900">$1,450</span>
                        <span className="ml-2 text-sm text-gray-500">Based on current usage</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
                    <h3 className="text-gray-500 text-sm font-medium">Top Spender</h3>
                    <div className="mt-2">
                        <span className="block text-xl font-semibold text-gray-900">GPT-4 Turbo</span>
                        <span className="text-sm text-gray-500">65% of total bill</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                </div>
            </div>

            {/* Chart Column */}
            <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">Cost Analysis</h2>
                    <button className="text-sm text-blue-600 hover:underline">Download Report</button>
                </div>
                <div style={{ width: '100%', height: 320 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={costData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} />
                            <YAxis axisLine={false} tickLine={false} prefix="$" />
                            <Tooltip cursor={{ fill: '#F3F4F6' }} />
                            <Legend />
                            <Bar dataKey="openai" name="OpenAI" stackId="a" fill="#3B82F6" barSize={32} />
                            <Bar dataKey="anthropic" name="Anthropic" stackId="a" fill="#8B5CF6" barSize={32} />
                            <Bar dataKey="azure" name="Azure AI" stackId="a" fill="#0EA5E9" barSize={32} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default CostTracking;
