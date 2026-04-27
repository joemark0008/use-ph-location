/**
 * Complete Cascading Dropdown Example
 * Demonstrates the full hierarchy: Region -> Province -> City -> Barangay
 */

import { useState } from 'react';
import { usePhLocation } from '@joemark0008/use-ph-location';

export default function AddressForm() {
  const {
    regions,
    getProvincesByRegion,
    getCitiesByProvince,
    getBarangaysByCity,
    loading,
    error,
  } = usePhLocation();

  // State for selected values
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedBarangay, setSelectedBarangay] = useState('');

  // Get filtered lists based on selections
  const provinceList = selectedRegion ? getProvincesByRegion(selectedRegion) : [];
  const cityList = selectedProvince ? getCitiesByProvince(selectedProvince) : [];
  const barangayList = selectedCity ? getBarangaysByCity(selectedCity) : [];

  // Handle region change - reset dependent fields
  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(e.target.value);
    setSelectedProvince('');
    setSelectedCity('');
    setSelectedBarangay('');
  };

  // Handle province change - reset dependent fields
  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvince(e.target.value);
    setSelectedCity('');
    setSelectedBarangay('');
  };

  // Handle city change - reset dependent field
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
    setSelectedBarangay('');
  };

  const handleBarangayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBarangay(e.target.value);
  };

  if (loading) {
    return <div className="loading">Loading address data...</div>;
  }

  if (error) {
    return <div className="error">Error loading data: {error}</div>;
  }

  return (
    <div className="address-form">
      <h2>Philippine Address Selector</h2>

      <div className="form-group">
        <label htmlFor="region">Region:</label>
        <select id="region" value={selectedRegion} onChange={handleRegionChange}>
          <option value="">-- Select Region --</option>
          {regions.map((region) => (
            <option key={region.region_code} value={region.region_code}>
              {region.region_name}
            </option>
          ))}
        </select>
        {selectedRegion && (
          <p className="selected">Selected: {regions.find(r => r.region_code === selectedRegion)?.region_name}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="province">Province:</label>
        <select
          id="province"
          value={selectedProvince}
          onChange={handleProvinceChange}
          disabled={!selectedRegion}
        >
          <option value="">-- Select Province --</option>
          {provinceList.map((province) => (
            <option key={province.province_code} value={province.province_code}>
              {province.province_name}
            </option>
          ))}
        </select>
        {selectedProvince && (
          <p className="selected">
            Selected: {provinceList.find(p => p.province_code === selectedProvince)?.province_name}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="city">City/Municipality:</label>
        <select
          id="city"
          value={selectedCity}
          onChange={handleCityChange}
          disabled={!selectedProvince}
        >
          <option value="">-- Select City --</option>
          {cityList.map((city) => (
            <option key={city.city_code} value={city.city_code}>
              {city.city_name}
            </option>
          ))}
        </select>
        {selectedCity && (
          <p className="selected">
            Selected: {cityList.find(c => c.city_code === selectedCity)?.city_name}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="barangay">Barangay:</label>
        <select
          id="barangay"
          value={selectedBarangay}
          onChange={handleBarangayChange}
          disabled={!selectedCity}
        >
          <option value="">-- Select Barangay --</option>
          {barangayList.map((barangay) => (
            <option key={barangay.brgy_code} value={barangay.brgy_code}>
              {barangay.brgy_name}
            </option>
          ))}
        </select>
        {selectedBarangay && (
          <p className="selected">
            Selected: {barangayList.find(b => b.brgy_code === selectedBarangay)?.brgy_name}
          </p>
        )}
      </div>

      {/* Summary */}
      {selectedBarangay && (
        <div className="summary">
          <h3>Selected Address:</h3>
          <p>
            {barangayList.find(b => b.brgy_code === selectedBarangay)?.brgy_name}
            {' '}({cityList.find(c => c.city_code === selectedCity)?.city_name}),{' '}
            {provinceList.find(p => p.province_code === selectedProvince)?.province_name},{' '}
            {regions.find(r => r.region_code === selectedRegion)?.region_name}
          </p>
        </div>
      )}

      <style>{`
        .address-form {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        h2 {
          color: #333;
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #333;
        }

        select {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 14px;
          background-color: white;
          cursor: pointer;
          transition: border-color 0.2s;
        }

        select:hover {
          border-color: #999;
        }

        select:focus {
          outline: none;
          border-color: #0066cc;
          box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
        }

        select:disabled {
          background-color: #f5f5f5;
          cursor: not-allowed;
          opacity: 0.6;
        }

        .selected {
          margin-top: 8px;
          padding: 8px 12px;
          background-color: #f0f4ff;
          border-left: 3px solid #0066cc;
          color: #0066cc;
          font-size: 13px;
          margin-bottom: 0;
        }

        .summary {
          margin-top: 30px;
          padding: 15px;
          background-color: #e8f5e9;
          border-radius: 4px;
          border-left: 4px solid #4caf50;
        }

        .summary h3 {
          margin-top: 0;
          color: #2e7d32;
        }

        .summary p {
          color: #1b5e20;
          margin: 0;
          line-height: 1.6;
        }

        .loading,
        .error {
          padding: 20px;
          text-align: center;
          border-radius: 4px;
        }

        .loading {
          background-color: #fff3cd;
          color: #856404;
        }

        .error {
          background-color: #f8d7da;
          color: #721c24;
        }
      `}</style>
    </div>
  );
}
