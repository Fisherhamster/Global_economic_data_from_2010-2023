import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface YearlyTrendsProps {
  data: Array<{
    year: number;
    avgInflation: number;
    avgGDP: number;
    avgUnemployment: number;
    avgInterest: number;
    dataPoints: number;
  }>;
}

export const YearlyTrends: React.FC<YearlyTrendsProps> = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm text-gray-600">
              <span className="font-medium" style={{ color: entry.color }}>
                {entry.name}: {entry.value.toFixed(2)}%
              </span>
            </p>
          ))}
          <p className="text-xs text-gray-500 mt-1">
            Data points: {payload[0]?.payload?.dataPoints}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Global Economic Trends by Year
      </h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="year"
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis
              stroke="#6b7280"
              fontSize={12}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="avgInflation"
              stroke="#ef4444"
              strokeWidth={2.5}
              name="Inflation Rate"
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="avgGDP"
              stroke="#10b981"
              strokeWidth={2.5}
              name="GDP Growth"
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="avgUnemployment"
              stroke="#f59e0b"
              strokeWidth={2.5}
              name="Unemployment"
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="avgInterest"
              stroke="#8b5cf6"
              strokeWidth={2.5}
              name="Interest Rate"
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};