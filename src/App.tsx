import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity,
  Database,
  Calendar,
  Globe
} from 'lucide-react';
import { MetricCard } from './components/MetricCard';
import { CountrySelector } from './components/CountrySelector';
import { TimeSeriesChart } from './components/TimeSeriesChart';
import { CountryComparison } from './components/CountryComparison';
import { YearlyTrends } from './components/YearlyTrends';
import { useEconomicData } from './hooks/useEconomicData';
import { getTimeSeriesData } from './utils/dataProcessor';

function App() {
  const { 
    processedData, 
    countryMetrics, 
    yearlyTrends, 
    countries, 
    loading, 
    error 
  } = useEconomicData();
  
  const [selectedCountry, setSelectedCountry] = useState('USA');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading economic data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Error: {error}
          </div>
          <p className="text-gray-600">Please check the data file and try again.</p>
        </div>
      </div>
    );
  }

  // Get current country metrics
  const currentCountryMetrics = countryMetrics.find(m => m.country === selectedCountry);
  
  // Get time series data for selected country
  const inflationData = getTimeSeriesData(processedData, selectedCountry, 'Inflation Rate (%)');
  const gdpData = getTimeSeriesData(processedData, selectedCountry, 'GDP Growth Rate (%)');
  const unemploymentData = getTimeSeriesData(processedData, selectedCountry, 'Unemployment Rate (%)');
  const interestData = getTimeSeriesData(processedData, selectedCountry, 'Interest Rate (%)');

  // Global statistics
  const totalDataPoints = processedData.length;
  const dateRange = processedData.length > 0 ? {
    start: new Date(Math.min(...processedData.map(d => d.dateObj.getTime()))),
    end: new Date(Math.max(...processedData.map(d => d.dateObj.getTime())))
  } : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Economic Indicators Dashboard
                </h1>
                <p className="text-sm text-gray-600">
                  Global economic data from 2010-2023
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Database className="w-4 h-4" />
                <span>{totalDataPoints.toLocaleString()} data points</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Globe className="w-4 h-4" />
                <span>{countries.length} countries</span>
              </div>
              {dateRange && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {dateRange.start.getFullYear()} - {dateRange.end.getFullYear()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Country Selector */}
        <div className="mb-8">
          <CountrySelector
            countries={countries}
            selectedCountry={selectedCountry}
            onCountryChange={setSelectedCountry}
          />
        </div>

        {/* Key Metrics Cards */}
        {currentCountryMetrics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Average Inflation Rate"
              value={currentCountryMetrics.avgInflation}
              unit="%"
              color="bg-red-100"
              icon={<TrendingUp className="w-6 h-6 text-red-600" />}
            />
            <MetricCard
              title="Average GDP Growth"
              value={currentCountryMetrics.avgGDP}
              unit="%"
              color="bg-green-100"
              icon={<BarChart3 className="w-6 h-6 text-green-600" />}
            />
            <MetricCard
              title="Average Unemployment"
              value={currentCountryMetrics.avgUnemployment}
              unit="%"
              color="bg-yellow-100"
              icon={<Users className="w-6 h-6 text-yellow-600" />}
            />
            <MetricCard
              title="Average Interest Rate"
              value={currentCountryMetrics.avgInterest}
              unit="%"
              color="bg-purple-100"
              icon={<DollarSign className="w-6 h-6 text-purple-600" />}
            />
          </div>
        )}

        {/* Time Series Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <TimeSeriesChart
            data={inflationData}
            title={`Inflation Rate - ${selectedCountry}`}
            color="#ef4444"
            unit="%"
          />
          <TimeSeriesChart
            data={gdpData}
            title={`GDP Growth Rate - ${selectedCountry}`}
            color="#10b981"
            unit="%"
          />
          <TimeSeriesChart
            data={unemploymentData}
            title={`Unemployment Rate - ${selectedCountry}`}
            color="#f59e0b"
            unit="%"
          />
          <TimeSeriesChart
            data={interestData}
            title={`Interest Rate - ${selectedCountry}`}
            color="#8b5cf6"
            unit="%"
          />
        </div>

        {/* Global Trends */}
        <div className="mb-8">
          <YearlyTrends data={yearlyTrends} />
        </div>

        {/* Country Comparisons */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CountryComparison
            data={countryMetrics}
            metric="avgInflation"
            title="Inflation Rate"
            color="#ef4444"
            unit="%"
          />
          <CountryComparison
            data={countryMetrics}
            metric="avgGDP"
            title="GDP Growth Rate"
            color="#10b981"
            unit="%"
          />
          <CountryComparison
            data={countryMetrics}
            metric="avgUnemployment"
            title="Unemployment Rate"
            color="#f59e0b"
            unit="%"
          />
          <CountryComparison
            data={countryMetrics}
            metric="avgStockIndex"
            title="Stock Index Value"
            color="#3b82f6"
            unit=""
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Economic Indicators Dashboard - Data from 2010-2023
            </p>
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500">Real-time insights</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;