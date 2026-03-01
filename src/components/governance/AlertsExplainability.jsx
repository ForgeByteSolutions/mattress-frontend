import React from 'react';

const AlertsExplainability = () => {
    // Mock Alerts
    const alerts = [
        { id: 1, type: 'critical', title: 'Unexpected Cost Spike', message: 'GPT-4 usage increased by 400% in the last hour.', time: '15 mins ago' },
        { id: 2, type: 'warning', title: 'Model Drift Detected', message: 'Claude 3 Opus output confidence dropped below threshold (0.85).', time: '1 hour ago' },
        { id: 3, type: 'info', title: 'New Policy Applied', message: 'Updated PII redaction rules have been deployed.', time: '3 hours ago' },
        { id: 4, type: 'success', title: 'Backup Completed', message: 'Daily governance log backup successful.', time: '5 hours ago' },
    ];

    const getAlertStyles = (type) => {
        switch (type) {
            case 'critical': return { border: 'border-l-4 border-red-500', bg: 'bg-red-50', icon: '' };
            case 'warning': return { border: 'border-l-4 border-yellow-500', bg: 'bg-yellow-50', icon: '' };
            case 'info': return { border: 'border-l-4 border-blue-500', bg: 'bg-blue-50', icon: '' };
            case 'success': return { border: 'border-l-4 border-green-500', bg: 'bg-green-50', icon: '' };
            default: return { border: 'border-l-4 border-gray-500', bg: 'bg-gray-50', icon: '•' };
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800">System Alerts & Explainability</h2>
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">Configure Alerts</button>
            </div>

            <div className="space-y-4">
                {alerts.map((alert) => {
                    const styles = getAlertStyles(alert.type);
                    return (
                        <div key={alert.id} className={`p-4 rounded-r-lg ${styles.bg} ${styles.border} flex items-start gap-4`}>
                            <div className="text-2xl pt-1">
                                {styles.icon}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                                    <span className="text-xs text-gray-500">{alert.time}</span>
                                </div>
                                <p className="text-sm text-gray-700 mt-1">{alert.message}</p>
                                <div className="mt-3 flex gap-3">
                                    <button className="text-xs bg-white border border-gray-200 px-3 py-1 rounded hover:bg-gray-50 transition">
                                        Investigate
                                    </button>
                                    <button className="text-xs text-gray-500 hover:text-gray-700">
                                        Dismiss
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AlertsExplainability;
