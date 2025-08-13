import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { CountryMetrics } from '../types';

interface CountryComparisonProps {
  data: CountryMetrics[];
  metric: keyof CountryMetrics;
  title: string;
  color: string;
  unit: string;
}

export const CountryComparison: React.FC<CountryComparisonProps> = ({
  data,
  metric,
  title,
  color,
  unit
}) => {
  const chartData = data
    .sort((a, b) => (b[metric] as number) - (a[metric] as number))
    .slice(0, 10); // Show top 10 countries

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-900">{label}</p>
          <p className="text-sm text-gray-600">
            <span className="font-medium" style={{ color }}>
              {title}: {payload[0].value.toFixed(2)}{unit}
            </span>
          </p>
          <p className="text-xs text-gray-500">
            Data points: {payload[0].payload.dataPoints}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {title} by Country (Average)
      </h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="country"
              stroke="#6b7280"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              stroke="#6b7280"
              fontSize={12}
              tickFormatter={(value) => `${value}${unit}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey={metric}
              fill={color}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};