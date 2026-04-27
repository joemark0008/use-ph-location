/**
 * Quick Start Example with Complete Address Output
 * Shows cascading dropdowns with styled output
 */

import { useState } from 'react';
import { usePhLocation } from '@joemark0008/use-ph-location';

export default function QuickStartExample() {
  const {
    regions,
    getProvincesByRegion,
    getCitiesByProvince,
    getBarangaysByCity,
    loading,
    error,
  } = usePhLocation();

  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedBarangay, setSelectedBarangay] = useState('');

  const provinceList = selectedRegion ? getProvincesByRegion(selectedRegion) : [];
  const cityList = selectedProvince ? getCitiesByProvince(selectedProvince) : [];
  const barangayList = selectedCity ? getBarangaysByCity(selectedCity) : [];

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(e.target.value);
    setSelectedProvince('');
    setSelectedCity('');
    setSelectedBarangay('');
  };

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvince(e.target.value);
    setSelectedCity('');
    setSelectedBarangay('');
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
    setSelectedBarangay('');
  };

  const handleBarangayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBarangay(e.target.value);
  };

  // Get selected names
  const selectedRegionName = regions.find(r => r.region_code === selectedRegion)?.region_name || '';
  const selectedProvinceName = provinceList.find(p => p.province_code === selectedProvince)?.province_name || '';
  const selectedCityName = cityList.find(c => c.city_code === selectedCity)?.city_name || '';
  const selectedBarangayName = barangayList.find(b => b.brgy_code === selectedBarangay)?.brgy_name || '';

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
        Loading address data...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#d32f2f', backgroundColor: '#ffebee', borderRadius: '8px' }}>
        Error: {error}
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 10px 0' }}>
          Philippine Address Selector
        </h1>
        <p style={{ fontSize: '14px', color: '#666', margin: '0' }}>
          Select your region, province, city, and barangay
        </p>
      </div>

      {/* Form */}
      <div style={{ backgroundColor: '#f8f9fa', padding: '30px', borderRadius: '12px', marginBottom: '30px' }}>
        {/* Region */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#1a1a1a', fontSize: '14px' }}>
            Region *
          </label>
          <select
            value={selectedRegion}
            onChange={handleRegionChange}
            style={{
              width: '100%',
              padding: '12px 14px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '14px',
              backgroundColor: 'white',
              cursor: 'pointer',
              boxSizing: 'border-box',
              transition: 'all 0.2s ease',
              boxShadow: selectedRegion ? '0 0 0 3px rgba(33, 150, 243, 0.1)' : 'none',
              borderColor: selectedRegion ? '#2196f3' : '#ddd',
            }}
          >
            <option value="">-- Select Region --</option>
            {regions.map((r) => (
              <option key={r.region_code} value={r.region_code}>
                {r.region_name}
              </option>
            ))}
          </select>
        </div>

        {/* Province */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#1a1a1a', fontSize: '14px' }}>
            Province {selectedRegion && '*'}
          </label>
          <select
            value={selectedProvince}
            onChange={handleProvinceChange}
            disabled={!selectedRegion}
            style={{
              width: '100%',
              padding: '12px 14px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '14px',
              backgroundColor: selectedRegion ? 'white' : '#f0f0f0',
              cursor: selectedRegion ? 'pointer' : 'not-allowed',
              opacity: selectedRegion ? 1 : 0.6,
              boxSizing: 'border-box',
              transition: 'all 0.2s ease',
              boxShadow: selectedProvince ? '0 0 0 3px rgba(33, 150, 243, 0.1)' : 'none',
              borderColor: selectedProvince ? '#2196f3' : '#ddd',
            }}
          >
            <option value="">-- Select Province --</option>
            {provinceList.map((p) => (
              <option key={p.province_code} value={p.province_code}>
                {p.province_name}
              </option>
            ))}
          </select>
        </div>

        {/* City */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#1a1a1a', fontSize: '14px' }}>
            City/Municipality {selectedProvince && '*'}
          </label>
          <select
            value={selectedCity}
            onChange={handleCityChange}
            disabled={!selectedProvince}
            style={{
              width: '100%',
              padding: '12px 14px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '14px',
              backgroundColor: selectedProvince ? 'white' : '#f0f0f0',
              cursor: selectedProvince ? 'pointer' : 'not-allowed',
              opacity: selectedProvince ? 1 : 0.6,
              boxSizing: 'border-box',
              transition: 'all 0.2s ease',
              boxShadow: selectedCity ? '0 0 0 3px rgba(33, 150, 243, 0.1)' : 'none',
              borderColor: selectedCity ? '#2196f3' : '#ddd',
            }}
          >
            <option value="">-- Select City --</option>
            {cityList.map((c) => (
              <option key={c.city_code} value={c.city_code}>
                {c.city_name}
              </option>
            ))}
          </select>
        </div>

        {/* Barangay */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#1a1a1a', fontSize: '14px' }}>
            Barangay {selectedCity && '*'}
          </label>
          <select
            value={selectedBarangay}
            onChange={handleBarangayChange}
            disabled={!selectedCity}
            style={{
              width: '100%',
              padding: '12px 14px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '14px',
              backgroundColor: selectedCity ? 'white' : '#f0f0f0',
              cursor: selectedCity ? 'pointer' : 'not-allowed',
              opacity: selectedCity ? 1 : 0.6,
              boxSizing: 'border-box',
              transition: 'all 0.2s ease',
              boxShadow: selectedBarangay ? '0 0 0 3px rgba(76, 175, 80, 0.1)' : 'none',
              borderColor: selectedBarangay ? '#4caf50' : '#ddd',
            }}
          >
            <option value="">-- Select Barangay --</option>
            {barangayList.map((b) => (
              <option key={b.brgy_code} value={b.brgy_code}>
                {b.brgy_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Complete Address Output */}
      {selectedBarangay && (
        <div
          style={{
            backgroundColor: '#e8f5e9',
            borderLeft: '5px solid #4caf50',
            borderRadius: '8px',
            padding: '24px',
            marginBottom: '30px',
          }}
        >
          <h2 style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', color: '#2e7d32', margin: '0 0 12px 0', letterSpacing: '0.5px' }}>
            Complete Address
          </h2>
          <p
            style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#1b5e20',
              margin: '0',
              lineHeight: '1.6',
            }}
          >
            {selectedBarangayName}, {selectedCityName}
            <br />
            {selectedProvinceName}, {selectedRegionName}
          </p>
        </div>
      )}

      {/* Address Parts Display */}
      {selectedBarangay && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginTop: '30px',
          }}
        >
          <div style={{ backgroundColor: '#fff3e0', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #ff9800' }}>
            <p style={{ fontSize: '12px', color: '#666', margin: '0 0 6px 0', fontWeight: '500' }}>BARANGAY</p>
            <p style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a1a', margin: '0' }}>{selectedBarangayName}</p>
          </div>

          <div style={{ backgroundColor: '#e3f2fd', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #2196f3' }}>
            <p style={{ fontSize: '12px', color: '#666', margin: '0 0 6px 0', fontWeight: '500' }}>CITY</p>
            <p style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a1a', margin: '0' }}>{selectedCityName}</p>
          </div>

          <div style={{ backgroundColor: '#f3e5f5', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #9c27b0' }}>
            <p style={{ fontSize: '12px', color: '#666', margin: '0 0 6px 0', fontWeight: '500' }}>PROVINCE</p>
            <p style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a1a', margin: '0' }}>{selectedProvinceName}</p>
          </div>

          <div style={{ backgroundColor: '#fce4ec', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #e91e63' }}>
            <p style={{ fontSize: '12px', color: '#666', margin: '0 0 6px 0', fontWeight: '500' }}>REGION</p>
            <p style={{ fontSize: '16px', fontWeight: '600', color: '#1a1a1a', margin: '0' }}>{selectedRegionName}</p>
          </div>
        </div>
      )}

      {/* Usage Instructions */}
      {!selectedBarangay && (
        <div
          style={{
            backgroundColor: '#f5f5f5',
            padding: '24px',
            borderRadius: '8px',
            textAlign: 'center',
            color: '#999',
          }}
        >
          <p style={{ fontSize: '14px', margin: '0' }}>👆 Select all fields to see your complete address</p>
        </div>
      )}
    </div>
  );
}
