import { EconomicData, ProcessedData, CountryMetrics } from '../types';

export const parseCSV = (csvText: string): EconomicData[] => {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const row: any = {};
    
    headers.forEach((header, index) => {
      const value = values[index];
      if (header === 'Date' || header === 'Country') {
        row[header] = value;
      } else {
        row[header] = parseFloat(value) || 0;
      }
    });
    
    return row as EconomicData;
  });
};

export const processData = (data: EconomicData[]): ProcessedData[] => {
  return data.map(item => {
    const dateObj = new Date(item.Date);
    return {
      ...item,
      year: dateObj.getFullYear(),
      month: dateObj.getMonth() + 1,
      dateObj
    };
  });
};

export const getCountryMetrics = (data: ProcessedData[]): CountryMetrics[] => {
  const countryGroups = data.reduce((acc, item) => {
    if (!acc[item.Country]) {
      acc[item.Country] = [];
    }
    acc[item.Country].push(item);
    return acc;
  }, {} as Record<string, ProcessedData[]>);

  return Object.entries(countryGroups).map(([country, items]) => ({
    country,
    avgInflation: items.reduce((sum, item) => sum + item['Inflation Rate (%)'], 0) / items.length,
    avgGDP: items.reduce((sum, item) => sum + item['GDP Growth Rate (%)'], 0) / items.length,
    avgUnemployment: items.reduce((sum, item) => sum + item['Unemployment Rate (%)'], 0) / items.length,
    avgInterest: items.reduce((sum, item) => sum + item['Interest Rate (%)'], 0) / items.length,
    avgStockIndex: items.reduce((sum, item) => sum + item['Stock Index Value'], 0) / items.length,
    dataPoints: items.length
  }));
};

export const getTimeSeriesData = (data: ProcessedData[], country: string, metric: keyof ProcessedData) => {
  return data
    .filter(item => item.Country === country)
    .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())
    .map(item => ({
      date: item.Date,
      value: item[metric] as number,
      year: item.year,
      month: item.month
    }));
};

export const getYearlyAverages = (data: ProcessedData[]) => {
  const yearGroups = data.reduce((acc, item) => {
    if (!acc[item.year]) {
      acc[item.year] = [];
    }
    acc[item.year].push(item);
    return acc;
  }, {} as Record<number, ProcessedData[]>);

  return Object.entries(yearGroups).map(([year, items]) => ({
    year: parseInt(year),
    avgInflation: items.reduce((sum, item) => sum + item['Inflation Rate (%)'], 0) / items.length,
    avgGDP: items.reduce((sum, item) => sum + item['GDP Growth Rate (%)'], 0) / items.length,
    avgUnemployment: items.reduce((sum, item) => sum + item['Unemployment Rate (%)'], 0) / items.length,
    avgInterest: items.reduce((sum, item) => sum + item['Interest Rate (%)'], 0) / items.length,
    dataPoints: items.length
  })).sort((a, b) => a.year - b.year);
};