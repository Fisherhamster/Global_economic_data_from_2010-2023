import { useState, useEffect } from 'react';
import { EconomicData, ProcessedData, CountryMetrics } from '../types';
import { parseCSV, processData, getCountryMetrics, getYearlyAverages } from '../utils/dataProcessor';

export const useEconomicData = () => {
  const [rawData, setRawData] = useState<EconomicData[]>([]);
  const [processedData, setProcessedData] = useState<ProcessedData[]>([]);
  const [countryMetrics, setCountryMetrics] = useState<CountryMetrics[]>([]);
  const [yearlyTrends, setYearlyTrends] = useState<any[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Fetch the CSV data
        const response = await fetch('/src/assets/economic_indicators_dataset_2010_2023.csv');
        if (!response.ok) {
          throw new Error('Failed to load data');
        }
        
        const csvText = await response.text();
        const parsed = parseCSV(csvText);
        const processed = processData(parsed);
        const metrics = getCountryMetrics(processed);
        const trends = getYearlyAverages(processed);
        const uniqueCountries = [...new Set(processed.map(item => item.Country))].sort();

        setRawData(parsed);
        setProcessedData(processed);
        setCountryMetrics(metrics);
        setYearlyTrends(trends);
        setCountries(uniqueCountries);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return {
    rawData,
    processedData,
    countryMetrics,
    yearlyTrends,
    countries,
    loading,
    error
  };
};