import React from 'react';

const ComplianceSecurity = () => {
    const policies = [
        { name: 'GDPR Data Privacy', status: 'pass', lastChecked: '10m ago' },
        { name: 'PII Redaction', status: 'pass', lastChecked: '2m ago' },
        { name: 'Bias Detection', status: 'warning', lastChecked: '1h ago' },
        { name: 'Toxicity Filter', status: 'pass', lastChecked: '2m ago' },
        { name: 'Rate Limiting', status: 'pass', lastChecked: '30s ago' },
    ];

    const violations = [
        { id: 1, policy: 'Bias Detection', severity: 'medium', description: 'Potential gender bias detected in recruitment model output.', time: '2 hours ago' },
        { id: 2, policy: 'PII Redaction', severity: 'low', description: 'Email address leakage attempted in prompt.', time: '5 hours ago' },
    ];

    const getStatusParams = (status) => {
        switch (status) {
            case 'pass': return { icon: '', color: 'text-green-600', bg: 'bg-green-50', label: 'Compliant' };
            case 'warning': return { icon: '', color: 'text-yellow-600', bg: 'bg-yellow-50', label: 'Warning' };
            case 'fail': return { icon: '', color: 'text-red-600', bg: 'bg-red-50', label: 'Failed' };
            default: return { icon: '•', color: 'text-gray-500', bg: 'bg-gray-50', label: 'Unknown' };
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Policy Check */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">Security & Compliance Policies</h2>
                    <span className="text-sm font-medium px-3 py-1 bg-green-100 text-green-800 rounded-full">Overall Score: 98/100</span>
                </div>
                <div className="space-y-4">
                    {policies.map((policy, idx) => {
                        const { icon, color, bg, label } = getStatusParams(policy.status);
                        return (
                            <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-gray-50 hover:bg-gray-50 transition">
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">{icon}</span>
                                    <div>
                                        <h4 className="font-medium text-gray-900">{policy.name}</h4>
                                        <p className="text-xs text-gray-500">Last checked: {policy.lastChecked}</p>
                                    </div>
                                </div>
                                <span className={`text-xs font-semibold px-2 py-1 rounded ${bg} ${color}`}>
                                    {label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Violations */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-6">Recent Violations</h2>
                {violations.length > 0 ? (
                    <div className="space-y-4">
                        {violations.map((v) => (
                            <div key={v.id} className="p-4 rounded-lg bg-red-50 border border-red-100">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="font-semibold text-red-800 text-sm">{v.policy}</span>
                                    <span className="text-xs text-red-600">{v.time}</span>
                                </div>
                                <p className="text-sm text-red-700 mb-2">{v.description}</p>
                                <div className="flex gap-2">
                                    <span className="text-xs font-medium px-2 py-0.5 bg-white text-red-600 border border-red-100 rounded">
                                        Severity: {v.severity.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="h-40 flex flex-col items-center justify-center text-gray-400">
                        <span className="text-4xl mb-2"></span>
                        <p>No active violations</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ComplianceSecurity;
