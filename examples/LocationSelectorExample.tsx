import React, { useState } from 'react';
import { usePhLocation, Barangay } from '../src/index';

/**
 * Example component demonstrating usePhLocation hook
 * Shows hierarchical location selection with all levels
 */
export function LocationSelectorExample() {
  const {
    regions,
    loading,
    error,
    getProvincesByRegion,
    getCitiesByProvince,
    getBarangaysByCity,
  } = usePhLocation();

  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedBarangay, setSelectedBarangay] = useState<Barangay | null>(null);

  // Get filtered data based on selections
  const provinces = selectedRegion ? getProvincesByRegion(selectedRegion) : [];
  const cities = selectedProvince ? getCitiesByProvince(selectedProvince) : [];
  const barangays = selectedCity ? getBarangaysByCity(selectedCity) : [];

  // Find selected barangay object for display
  const barangayObj = barangays.find((b) => b.brgy_code === selectedBarangay?.brgy_code);

  if (loading) return <div className="p-4">Loading location data...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Philippine Location Selector</h1>

      <div className="space-y-6">
        {/* Region Select */}
        <div>
          <label className="block text-lg font-semibold mb-2">Region</label>
          <select
            value={selectedRegion}
            onChange={(e) => {
              setSelectedRegion(e.target.value);
              setSelectedProvince('');
              setSelectedCity('');
              setSelectedBarangay(null);
            }}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">-- Select Region --</option>
            {regions.map((region) => (
              <option key={region.region_code} value={region.region_code}>
                {region.region_name}
              </option>
            ))}
          </select>
        </div>

        {/* Province Select */}
        <div>
          <label className="block text-lg font-semibold mb-2">Province</label>
          <select
            value={selectedProvince}
            onChange={(e) => {
              setSelectedProvince(e.target.value);
              setSelectedCity('');
              setSelectedBarangay(null);
            }}
            disabled={!selectedRegion}
            className="w-full p-2 border border-gray-300 rounded disabled:opacity-50"
          >
            <option value="">-- Select Province --</option>
            {provinces.map((province) => (
              <option key={province.province_code} value={province.province_code}>
                {province.province_name}
              </option>
            ))}
          </select>
        </div>

        {/* City Select */}
        <div>
          <label className="block text-lg font-semibold mb-2">City/Municipality</label>
          <select
            value={selectedCity}
            onChange={(e) => {
              setSelectedCity(e.target.value);
              setSelectedBarangay(null);
            }}
            disabled={!selectedProvince}
            className="w-full p-2 border border-gray-300 rounded disabled:opacity-50"
          >
            <option value="">-- Select City/Municipality --</option>
            {cities.map((city) => (
              <option key={city.city_code} value={city.city_code}>
                {city.city_name}
              </option>
            ))}
          </select>
        </div>

        {/* Barangay Select */}
        <div>
          <label className="block text-lg font-semibold mb-2">Barangay</label>
          <select
            value={selectedBarangay?.brgy_code || ''}
            onChange={(e) => {
              const barangay = barangays.find((b) => b.brgy_code === e.target.value);
              setSelectedBarangay(barangay || null);
            }}
            disabled={!selectedCity}
            className="w-full p-2 border border-gray-300 rounded disabled:opacity-50"
          >
            <option value="">-- Select Barangay --</option>
            {barangays.map((barangay) => (
              <option key={barangay.brgy_code} value={barangay.brgy_code}>
                {barangay.brgy_name}
              </option>
            ))}
          </select>
        </div>

        {/* Display Selected Location Info */}
        {selectedBarangay && (
          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Selected Location</h2>
            <div className="space-y-2">
              <p>
                <strong>Region Code:</strong> {selectedRegion}
              </p>
              <p>
                <strong>Province Code:</strong> {selectedProvince}
              </p>
              <p>
                <strong>City Code:</strong> {selectedCity}
              </p>
              <p>
                <strong>Barangay Code:</strong> {selectedBarangay.brgy_code}
              </p>
              <p>
                <strong>Barangay Name:</strong> {selectedBarangay.brgy_name}
              </p>
            </div>

            {/* JSON Output */}
            <div className="mt-4 p-4 bg-gray-100 rounded font-mono text-sm">
              <pre>{JSON.stringify(selectedBarangay, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LocationSelectorExample;
