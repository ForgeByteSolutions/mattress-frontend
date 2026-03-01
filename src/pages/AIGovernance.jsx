import React from 'react';
import ExecutiveOverview from '../components/governance/ExecutiveOverview';
import LoggingAudit from '../components/governance/LoggingAudit';
import MonitoringMetrics from '../components/governance/MonitoringMetrics';
import CostTracking from '../components/governance/CostTracking';
import ComplianceSecurity from '../components/governance/ComplianceSecurity';
import ModelPerformance from '../components/governance/ModelPerformance';
import AlertsExplainability from '../components/governance/AlertsExplainability';

const AIGovernance = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">AI Governance & Observability</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Control tower for AI reliability, compliance, and cost.
                        </p>
                    </div>
                    <div className="flex space-x-3">
                        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            System Healthy
                        </span>
                        <span className="text-gray-500 text-sm flex items-center">
                            Last updated: Just now
                        </span>
                    </div>
                </div>

                {/* Section 1: Executive Overview */}
                <section id="executive-overview">
                    <ExecutiveOverview />
                </section>

                {/* Section 2: Logging & Audit */}
                <section id="logging-audit">
                    <LoggingAudit />
                </section>

                {/* Section 3: Monitoring & Metrics */}
                <section id="monitoring-metrics">
                    <MonitoringMetrics />
                </section>

                {/* Section 4: Cost Tracking */}
                <section id="cost-tracking">
                    <CostTracking />
                </section>

                {/* Section 5: Compliance & Security */}
                <section id="compliance-security">
                    <ComplianceSecurity />
                </section>

                {/* Section 6: Model Performance */}
                <section id="model-performance">
                    <ModelPerformance />
                </section>

                {/* Section 7: Alerts */}
                <section id="alerts">
                    <AlertsExplainability />
                </section>

            </div>
        </div>
    );
};

export default AIGovernance;
