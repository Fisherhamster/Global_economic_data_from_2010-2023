export interface EconomicData {
  Date: string;
  Country: string;
  'Inflation Rate (%)': number;
  'GDP Growth Rate (%)': number;
  'Unemployment Rate (%)': number;
  'Interest Rate (%)': number;
  'Stock Index Value': number;
}

export interface ProcessedData extends EconomicData {
  year: number;
  month: number;
  dateObj: Date;
}

export interface CountryMetrics {
  country: string;
  avgInflation: number;
  avgGDP: number;
  avgUnemployment: number;
  avgInterest: number;
  avgStockIndex: number;
  dataPoints: number;
}