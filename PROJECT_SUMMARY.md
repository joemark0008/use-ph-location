# usePhLocation - Project Summary

## 📦 Complete React Hooks NPM Package for Philippine Location Data

A production-ready React hook package with hierarchical location selection for Philippine regions, provinces, cities, and barangays.

## ✅ Project Structure

```
use-ph-location/
├── src/
│   ├── index.ts                 # Main export file
│   ├── usePhLocation.ts         # Core hook implementation
│   └── types.ts                 # TypeScript type definitions
├── data/
│   ├── regions.json             # Region data (13 regions)
│   ├── provinces.json           # Province data
│   ├── cities.json              # City/Municipality data
│   └── barangays.json           # Barangay data (smallest administrative division)
├── examples/
│   └── LocationSelectorExample.tsx  # Complete usage example
├── package.json                 # NPM package configuration
├── tsconfig.json                # TypeScript configuration
├── README.md                    # Comprehensive documentation
├── INSTALLATION.md              # Setup and configuration guide
├── CONTRIBUTING.md              # Contribution guidelines
├── LICENSE                      # MIT License
└── .gitignore                   # Git ignore rules
```

## 🎯 Key Features

### ✨ Core Features
- **React Hooks API** - Modern `usePhLocation()` hook
- **TypeScript Support** - Full type definitions included
- **Hierarchical Filtering** - Region → Province → City → Barangay
- **Local & Remote Data** - Bundled JSON files with fallback to remote API
- **Performance Optimized** - Memoized callbacks, lazy filtering
- **No UI Dependencies** - Headless hook, use with any UI library

### 📊 Data Included
- **13 Regions** - Complete Philippine administrative regions
- **Provinces** - All provinces with proper region mapping
- **Cities/Municipalities** - Cities and municipalities with province mapping
- **Barangays** - Barangays (smallest administrative divisions)
- **Code Mappings** - Region, province, city, and barangay codes

## 🚀 Usage Examples

### Basic Usage
```tsx
import { usePhLocation } from 'use-ph-location';

function App() {
  const { regions, loading } = usePhLocation();
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <select>
      {regions.map(r => (
        <option key={r.region_code} value={r.region_code}>
          {r.region_name}
        </option>
      ))}
    </select>
  );
}
```

### Advanced - Hierarchical Selection
```tsx
const {
  regions,
  getProvincesByRegion,
  getCitiesByProvince,
  getBarangaysByCity
} = usePhLocation();

// Filter data based on user selection
const provinces = getProvincesByRegion(selectedRegionCode);
const cities = getCitiesByProvince(selectedProvinceCode);
const barangays = getBarangaysByCity(selectedCityCode);
```

### Configuration Options
```tsx
// Use local bundled data (default)
const hook1 = usePhLocation({ useLocalData: true });

// Use remote API
const hook2 = usePhLocation({
  useLocalData: false,
  dataSourceUrl: 'https://isaacdarcilla.github.io/philippine-addresses'
});
```

## 📋 API Reference

### Hook Return Value
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
  
  // Utility Functions
  getProvincesByRegion: (regionCode: string) => Province[];
  getCitiesByProvince: (provinceCode: string) => City[];
  getBarangaysByCity: (cityCode: string) => Barangay[];
  refreshData: () => Promise<void>;
}
```

### Data Types
```typescript
interface Region {
  region_code: string;
  region_name: string;
}

interface Province {
  province_code: string;
  province_name: string;
  region_code: string;
}

interface City {
  city_code: string;
  city_name: string;
  province_code: string;
  region_code: string;
}

interface Barangay {
  brgy_code: string;
  brgy_name: string;
  city_code: string;
  province_code: string;
  region_code: string;
}
```

## 🛠️ Installation

```bash
# npm
npm install use-ph-location

# yarn
yarn add use-ph-location

# pnpm
pnpm add use-ph-location
```

## 📦 Package Configuration

- **Name**: `use-ph-location`
- **Main**: `dist/index.js`
- **Module**: `dist/index.esm.js`
- **Types**: `dist/index.d.ts`
- **License**: MIT
- **Peer Dependency**: React >=16.8.0

## 🔄 Data Sources

### Local (Default)
- Bundled JSON files included in package
- Faster loading, no network required
- Files: `data/*.json`

### Remote (Optional)
- Source: https://isaacdarcilla.github.io/philippine-addresses
- Remote API for latest data
- Requires network connection

## 📚 Documentation Files

1. **README.md** - Complete user guide with examples
2. **INSTALLATION.md** - Setup instructions for different environments
3. **CONTRIBUTING.md** - Guidelines for contributors
4. **examples/LocationSelectorExample.tsx** - Full working example

## 🎨 Example Integrations

### React Hook Form Integration
```tsx
const { control, watch } = useForm();
const { regions, getProvincesByRegion } = usePhLocation();

const selectedRegion = watch('region');

<Controller
  name="region"
  control={control}
  render={({ field }) => (
    <select {...field}>
      {regions.map(r => (
        <option value={r.region_code}>{r.region_name}</option>
      ))}
    </select>
  )}
/>
```

### Controlled Component Pattern
```tsx
const [region, setRegion] = useState('');
const { regions, getProvincesByRegion } = usePhLocation();

const handleRegionChange = (e) => {
  setRegion(e.target.value);
};

const provinces = region ? getProvincesByRegion(region) : [];
```

## ⚡ Performance Considerations

- Uses `useCallback` for memoized filtering functions
- Data loaded once on mount and cached in state
- Efficient filtering for large datasets
- Suitable for React virtualization if needed

## 🧪 Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch mode
npm run dev

# Clean build
npm run clean

# Run tests (when available)
npm test
```

## 📝 TypeScript Support

Full TypeScript support with exported types:

```tsx
import {
  usePhLocation,
  Region,
  Province,
  City,
  Barangay,
  UsePhLocationReturn,
  UsePhLocationConfig
} from 'use-ph-location';
```

## 🤝 Contributing

Contributions welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - free for personal and commercial use

## 🔗 Resources

- [Philippine Addresses Data Source](https://github.com/isaacs-darcilla/philippine-addresses)
- [React Hooks Documentation](https://react.dev/reference/react)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🚀 Ready to Use

This package is production-ready and can be published to NPM immediately. All files are organized, documented, and follow best practices for npm package development.

### Publishing to NPM

1. Update version in `package.json`
2. Build: `npm run build`
3. Login: `npm login`
4. Publish: `npm publish`

---

**Built with ❤️ for the Philippine developer community**
