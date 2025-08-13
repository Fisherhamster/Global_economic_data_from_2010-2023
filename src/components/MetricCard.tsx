import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  unit: string;
  trend?: 'up' | 'down' | 'neutral';
  color: string;
  icon: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  trend = 'neutral',
  color,
  icon
}) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
        {getTrendIcon()}
      </div>
      
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <div className="flex items-baseline space-x-1">
          <span className="text-2xl font-bold text-gray-900">
            {value.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500">{unit}</span>
        </div>
      </div>
    </div>
  );
};