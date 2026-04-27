# usePhLocation

A powerful React hook for handling Philippine location data with hierarchical filtering capabilities. Easily manage region, province, city/municipality, and barangay selection with built-in TypeScript support.

![npm version](https://img.shields.io/npm/v/use-ph-location)
![npm downloads](https://img.shields.io/npm/dm/use-ph-location)
![license](https://img.shields.io/npm/l/use-ph-location)

## Features

✨ **Easy to use** - Simple React hook API  
📦 **Lightweight** - Minimal dependencies (only requires React)  
🚀 **Performance optimized** - Uses memoized callbacks for filtering  
🎯 **TypeScript support** - Fully typed with TypeScript interfaces  
🌍 **Complete data** - All regions, provinces, cities, and barangays  
🔄 **Flexible data loading** - Local JSON or remote API support  
📱 **No UI components** - Headless hook, use with any UI library  

## Installation

```bash
npm install use-ph-location
# or
yarn add use-ph-location
# or
pnpm add use-ph-location
```

## Quick Start

```tsx
import { usePhLocation } from '@joemark0008/use-ph-location';

function LocationSelector() {
  const {
    regions,
    provinces,
    cities,
    barangays,
    loading,
    error,
    getProvincesByRegion,
    getCitiesByProvince,
    getBarangaysByCity,
  } = usePhLocation();

  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedBarangay, setSelectedBarangay] = useState('');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const provinceList = selectedRegion
    ? getProvincesByRegion(selectedRegion)
    : [];
  const cityList = selectedProvince
    ? getCitiesByProvince(selectedProvince)
    : [];
  const barangayList = selectedCity
    ? getBarangaysByCity(selectedCity)
    : [];

  return (
    <div>
      <select
        value={selectedRegion}
        onChange={(e) => {
          setSelectedRegion(e.target.value);
          setSelectedProvince('');
          setSelectedCity('');
          setSelectedBarangay('');
        }}
      >
        <option value="">Select Region</option>
        {regions.map((region) => (
          <option key={region.region_code} value={region.region_code}>
            {region.region_name}
          </option>
        ))}
      </select>

      <select
        value={selectedProvince}
        onChange={(e) => {
          setSelectedProvince(e.target.value);
          setSelectedCity('');
          setSelectedBarangay('');
        }}
        disabled={!selectedRegion}
      >
        <option value="">Select Province</option>
        {provinceList.map((province) => (
          <option key={province.province_code} value={province.province_code}>
            {province.province_name}
          </option>
        ))}
      </select>

      <select
        value={selectedCity}
        onChange={(e) => {
          setSelectedCity(e.target.value);
          setSelectedBarangay('');
        }}
        disabled={!selectedProvince}
      >
        <option value="">Select City/Municipality</option>
        {cityList.map((city) => (
          <option key={city.city_code} value={city.city_code}>
            {city.city_name}
          </option>
        ))}
      </select>

      <select
        value={selectedBarangay}
        onChange={(e) => setSelectedBarangay(e.target.value)}
        disabled={!selectedCity}
      >
        <option value="">Select Barangay</option>
        {barangayList.map((barangay) => (
          <option key={barangay.brgy_code} value={barangay.brgy_code}>
            {barangay.brgy_name}
          </option>
        ))}
      </select>

      {selectedBarangay && (
        <div>
          <h3>Selected Location:</h3>
          <p>Region Code: {selectedRegion}</p>
          <p>Province Code: {selectedProvince}</p>
          <p>City Code: {selectedCity}</p>
          <p>Barangay Code: {selectedBarangay}</p>
        </div>
      )}
    </div>
  );
}

export default LocationSelector;
```

## API Reference

### `usePhLocation(config?)`

Main hook for accessing Philippine location data.

#### Parameters

```typescript
interface UsePhLocationConfig {
  /**
   * URL for remote data source
   * @default "https://isaacdarcilla.github.io/philippine-addresses"
   */
  dataSourceUrl?: string;
  
  /**
   * Use local JSON data instead of fetching from remote
   * @default true
   */
  useLocalData?: boolean;
}
```

#### Returns

```typescript
interface UsePhLocationReturn {
  // Data
  regions: Region[];
  provinces: Province[];
  cities: City[];
  barangays: Barangay[];
  
  // State
  loading: boolean;
  error: string | null;
  
  // Utility functions
  getProvincesByRegion: (regionCode: string) => Province[];
  getCitiesByProvince: (provinceCode: string) => City[];
  getBarangaysByCity: (cityCode: string) => Barangay[];
  refreshData: () => Promise<void>;
}
```

### Data Types

#### Region
```typescript
interface Region {
  region_code: string;
  region_name: string;
}
```

#### Province
```typescript
interface Province {
  province_code: string;
  province_name: string;
  region_code: string;
}
```

#### City
```typescript
interface City {
  city_code: string;
  city_name: string;
  province_code: string;
  region_code: string;
}
```

#### Barangay
```typescript
interface Barangay {
  brgy_code: string;
  brgy_name: string;
  city_code: string;
  province_code: string;
  region_code: string;
}
```

## Usage Examples

### Example 1: Basic Usage

```tsx
import { usePhLocation } from 'use-ph-location';

function App() {
  const { regions, loading } = usePhLocation();

  if (loading) return <p>Loading regions...</p>;

  return (
    <select>
      {regions.map((r) => (
        <option key={r.region_code} value={r.region_code}>
          {r.region_name}
        </option>
      ))}
    </select>
  );
}
```

### Example 2: Using Remote Data Source

```tsx
const { regions, provinces, loading, error } = usePhLocation({
  useLocalData: false,
  dataSourceUrl: 'https://isaacdarcilla.github.io/philippine-addresses',
});
```

### Example 3: Controlled Component

```tsx
import { usePhLocation } from 'use-ph-location';
import { useState } from 'react';

function AddressForm() {
  const { 
    provinces, 
    getProvincesByRegion,
    getCitiesByProvince 
  } = usePhLocation();
  
  const [region, setRegion] = useState('');
  const [province, setProvince] = useState('');

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRegion(e.target.value);
    setProvince(''); // Reset province
  };

  const provinceOptions = getProvincesByRegion(region);
  const cityOptions = getCitiesByProvince(province);

  return (
    <form>
      <div>
        <label>Region:</label>
        <input 
          type="text" 
          value={region} 
          onChange={(e) => handleRegionChange(e)}
        />
      </div>
      
      <div>
        <label>Province:</label>
        <select 
          value={province} 
          onChange={(e) => setProvince(e.target.value)}
          disabled={!region}
        >
          <option value="">Select Province</option>
          {provinceOptions.map((p) => (
            <option key={p.province_code} value={p.province_code}>
              {p.province_name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}
```

### Example 4: React Hook Form Integration

```tsx
import { usePhLocation } from '@joemark0008/use-ph-location';
import { useForm, Controller } from 'react-hook-form';

function RegistrationForm() {
  const { control, watch } = useForm();
  const { regions, getProvincesByRegion, getCitiesByProvince } = usePhLocation();
  
  const selectedRegion = watch('region');
  const selectedProvince = watch('province');

  return (
    <form>
      <Controller
        control={control}
        name="region"
        render={({ field }) => (
          <select {...field}>
            <option value="">Select Region</option>
            {regions.map((r) => (
              <option key={r.region_code} value={r.region_code}>
                {r.region_name}
              </option>
            ))}
          </select>
        )}
      />

      <Controller
        control={control}
        name="province"
        render={({ field }) => (
          <select {...field} disabled={!selectedRegion}>
            <option value="">Select Province</option>
            {getProvincesByRegion(selectedRegion).map((p) => (
              <option key={p.province_code} value={p.province_code}>
                {p.province_name}
              </option>
            ))}
          </select>
        )}
      />
    </form>
  );
}
```

### Example 5: Complete Cascading Dropdowns (Region → Province → City → Barangay)

```tsx
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div>
        <label>Region:</label>
        <select value={selectedRegion} onChange={handleRegionChange}>
          <option value="">Select Region</option>
          {regions.map((r) => (
            <option key={r.region_code} value={r.region_code}>
              {r.region_name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Province:</label>
        <select value={selectedProvince} onChange={handleProvinceChange} disabled={!selectedRegion}>
          <option value="">Select Province</option>
          {provinceList.map((p) => (
            <option key={p.province_code} value={p.province_code}>
              {p.province_name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>City/Municipality:</label>
        <select value={selectedCity} onChange={handleCityChange} disabled={!selectedProvince}>
          <option value="">Select City</option>
          {cityList.map((c) => (
            <option key={c.city_code} value={c.city_code}>
              {c.city_name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Barangay:</label>
        <select value={selectedBarangay} onChange={handleCityChange} disabled={!selectedCity}>
          <option value="">Select Barangay</option>
          {barangayList.map((b) => (
            <option key={b.brgy_code} value={b.brgy_code}>
              {b.brgy_name}
            </option>
          ))}
        </select>
      </div>

      {selectedBarangay && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0' }}>
          <strong>Selected Address:</strong>
          <p>
            {barangayList.find(b => b.brgy_code === selectedBarangay)?.brgy_name}
            {' '}({cityList.find(c => c.city_code === selectedCity)?.city_name}),{' '}
            {provinceList.find(p => p.province_code === selectedProvince)?.province_name},{' '}
            {regions.find(r => r.region_code === selectedRegion)?.region_name}
          </p>
        </div>
      )}
    </div>
  );
}
```

**Key Features in this example:**
- ✅ All 4 dropdown levels: Region → Province → City → Barangay
- ✅ Automatic reset of dependent fields when parent changes
- ✅ Disabled states for cascading behavior
- ✅ Summary display of selected address
- ✅ Complete hierarchy path shown to user

## Performance

The hook uses React's `useCallback` for memoized filtering functions to prevent unnecessary re-renders. All data is loaded once on mount and cached in component state.

```tsx
// These functions won't change on every render
const getProvincesByRegion = useCallback(...);
const getCitiesByProvince = useCallback(...);
const getBarangaysByCity = useCallback(...);
```

## Data Sources

By default, the hook loads data from local JSON files bundled with the package. Optionally, you can use the remote data source:

- **Remote**: https://isaacdarcilla.github.io/philippine-addresses
- **Local**: Bundled JSON files (default)

## Browser Support

Works with all modern browsers that support React 16.8+ and ES2020.

## TypeScript

Full TypeScript support included. All types are exported:

```tsx
import {
  usePhLocation,
  Region,
  Province,
  City,
  Barangay,
  UsePhLocationReturn,
  UsePhLocationConfig,
} from 'use-ph-location';
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Credits

This project is inspired by and builds upon the work of:

- **[select-philippines-address](https://github.com/jmrplayers/select-philippines-address)** - The original library that provided the foundation and data structure for Philippine location hierarchies.

## Data Credits

Location data sourced from [isaac-darcilla/philippine-addresses](https://github.com/isaacs-darcilla/philippine-addresses)

## License

MIT License - see LICENSE file for details

## Support

If you encounter any issues or have suggestions, please open an issue on [GitHub](https://github.com/yourusername/use-ph-location/issues).

## Changelog

### v1.0.0
- Initial release
- Support for regions, provinces, cities, and barangays
- Local and remote data loading
- Full TypeScript support
- Memoized filtering functions
