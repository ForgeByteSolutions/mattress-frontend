import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ModelPerformance = () => {
    // Mock Drift Data
    const driftData = [
        { day: 'Day 1', inputDrift: 0.02, outputDrift: 0.01 },
        { day: 'Day 2', inputDrift: 0.03, outputDrift: 0.02 },
        { day: 'Day 3', inputDrift: 0.02, outputDrift: 0.01 },
        { day: 'Day 4', inputDrift: 0.05, outputDrift: 0.03 },
        { day: 'Day 5', inputDrift: 0.08, outputDrift: 0.04 },
        { day: 'Day 6', inputDrift: 0.12, outputDrift: 0.06 },
        { day: 'Day 7', inputDrift: 0.04, outputDrift: 0.02 },
    ];

    const models = [
        { name: 'GPT-4 Turbo', driftScore: '0.04', status: 'Stable' },
        { name: 'Claude 3 Opus', driftScore: '0.12', status: 'Drifting' },
        { name: 'Llama 3 70B', driftScore: '0.02', status: 'Stable' },
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row justify-between mb-6">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">Model Drift & Reliability</h2>
                    <p className="text-sm text-gray-500">Monitoring data distribution changes over time.</p>
                </div>
                <div className="mt-4 md:mt-0 flex gap-4">
                    {models.map((m, idx) => (
                        <div key={idx} className="text-right">
                            <p className="text-xs text-gray-400">{m.name}</p>
                            <p className={`font-semibold ${m.status === 'Drifting' ? 'text-yellow-600' : 'text-green-600'}`}>
                                {m.status} ({m.driftScore})
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ width: '100%', height: 270 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={driftData}>
                        <defs>
                            <linearGradient id="colorDrift" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="inputDrift" stroke="#8B5CF6" strokeWidth={2} name="Input Drift" fill="url(#colorDrift)" />
                        <Area type="monotone" dataKey="outputDrift" stroke="#3B82F6" strokeWidth={2} name="Output Drift" fill="none" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-4 flex gap-6 justify-center">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                    <span className="text-sm text-gray-600">Input Data Drift</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                    <span className="text-sm text-gray-600">Output Confidence Drift</span>
                </div>
            </div>
        </div>
    );
};

export default ModelPerformance;
