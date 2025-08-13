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
import { format } from 'date-fns';

interface TimeSeriesChartProps {
  data: Array<{
    date: string;
    value: number;
    year: number;
    month: number;
  }>;
  title: string;
  color: string;
  unit: string;
}

export const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({
  data,
  title,
  color,
  unit
}) => {
  const formatXAxisLabel = (tickItem: string) => {
    try {
      const date = new Date(tickItem);
      return format(date, 'MMM yyyy');
    } catch {
      return tickItem;
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const date = new Date(label);
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-900">
            {format(date, 'MMMM yyyy')}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium" style={{ color }}>
              {title}: {payload[0].value.toFixed(2)}{unit}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              tickFormatter={formatXAxisLabel}
              stroke="#6b7280"
              fontSize={12}
              interval="preserveStartEnd"
            />
            <YAxis
              stroke="#6b7280"
              fontSize={12}
              tickFormatter={(value) => `${value}${unit}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2.5}
              dot={{ fill: color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};