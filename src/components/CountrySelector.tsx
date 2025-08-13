import React from 'react';
import { Globe } from 'lucide-react';

interface CountrySelectorProps {
  countries: string[];
  selectedCountry: string;
  onCountryChange: (country: string) => void;
}

export const CountrySelector: React.FC<CountrySelectorProps> = ({
  countries,
  selectedCountry,
  onCountryChange
}) => {
  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2">
        <Globe className="w-5 h-5 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">Country:</span>
      </div>
      
      <select
        value={selectedCountry}
        onChange={(e) => onCountryChange(e.target.value)}
        className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm font-medium text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
      >
        {countries.map(country => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
};