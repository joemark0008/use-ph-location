/**
 * Simple Dropdown Example
 * Minimal version showing just the basics
 */

import { useState } from 'react';
import { usePhLocation } from '@joemark0008/use-ph-location';

export default function SimpleAddressDropdowns() {
  const { regions, getProvincesByRegion, getCitiesByProvince, getBarangaysByCity } =
    usePhLocation();

  const [region, setRegion] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [barangay, setBarangay] = useState('');

  return (
    <div>
      <h2>Select Address</h2>

      {/* Region Dropdown */}
      <div>
        <label>Region:</label>
        <select value={region} onChange={(e) => setRegion(e.target.value)}>
          <option value="">Select Region</option>
          {regions.map((r) => (
            <option key={r.region_code} value={r.region_code}>
              {r.region_name}
            </option>
          ))}
        </select>
      </div>

      {/* Province Dropdown */}
      <div>
        <label>Province:</label>
        <select value={province} onChange={(e) => setProvince(e.target.value)} disabled={!region}>
          <option value="">Select Province</option>
          {getProvincesByRegion(region).map((p) => (
            <option key={p.province_code} value={p.province_code}>
              {p.province_name}
            </option>
          ))}
        </select>
      </div>

      {/* City Dropdown */}
      <div>
        <label>City:</label>
        <select value={city} onChange={(e) => setCity(e.target.value)} disabled={!province}>
          <option value="">Select City</option>
          {getCitiesByProvince(province).map((c) => (
            <option key={c.city_code} value={c.city_code}>
              {c.city_name}
            </option>
          ))}
        </select>
      </div>

      {/* Barangay Dropdown */}
      <div>
        <label>Barangay:</label>
        <select value={barangay} onChange={(e) => setBarangay(e.target.value)} disabled={!city}>
          <option value="">Select Barangay</option>
          {getBarangaysByCity(city).map((b) => (
            <option key={b.brgy_code} value={b.brgy_code}>
              {b.brgy_name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
