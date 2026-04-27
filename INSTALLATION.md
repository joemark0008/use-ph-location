# Installation & Setup Guide

## Installation

### npm
```bash
npm install @joemark0008/use-ph-location
```

### yarn
```bash
yarn add @joemark0008/use-ph-location
```

### pnpm
```bash
pnpm add @joemark0008/use-ph-location
```

## Requirements

- React 16.8 or higher (for Hooks support)
- Node.js 12 or higher

## Peer Dependencies

The package requires React as a peer dependency. Make sure you have React installed in your project:

```bash
npm install react
```

## Quick Start

### 1. Basic Usage

```tsx
import { usePhLocation } from '@joemark0008/use-ph-location';
import { useState } from 'react';

function MyComponent() {
  const { regions, loading } = usePhLocation();
  
  return (
    <div>
      {loading && <p>Loading...</p>}
      <select>
        {regions.map(r => (
          <option key={r.region_code} value={r.region_code}>
            {r.region_name}
          </option>
        ))}
      </select>
    </div>
  );
}
```

### 2. Using Local Data (Default)

By default, the hook uses local JSON data bundled with the package:

```tsx
const { regions, provinces, cities, barangays } = usePhLocation({
  useLocalData: true // This is the default
});
```

### 3. Using Remote Data

To fetch data from the remote API instead:

```tsx
const { regions, provinces } = usePhLocation({
  useLocalData: false,
  dataSourceUrl: 'https://isaacdarcilla.github.io/philippine-addresses'
});
```

## Configuration Options

### `UsePhLocationConfig`

```typescript
interface UsePhLocationConfig {
  /**
   * Use bundled local JSON files
   * @default true
   */
  useLocalData?: boolean;
  
  /**
   * URL to fetch remote data from
   * @default 'https://isaacdarcilla.github.io/philippine-addresses'
   */
  dataSourceUrl?: string;
}
```

## Import Styles

### ES6 Modules
```tsx
import { usePhLocation, Region, Province, City, Barangay } from '@joemark0008/use-ph-location';
```

### CommonJS
```javascript
const { usePhLocation } = require('@joemark0008/use-ph-location');
```

## TypeScript Setup

The package is fully typed. For best TypeScript support, ensure you have `"moduleResolution": "node"` in your `tsconfig.json`.

```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "lib": ["ES2020", "DOM"],
    "jsx": "react-jsx"
  }
}
```

## Complete Setup Example

### Next.js Project

1. Install:
```bash
npm install use-ph-location
```

2. Create a component:
```tsx
// components/LocationSelector.tsx
'use client'; // If using App Router

import { usePhLocation } from '@joemark0008/use-ph-location';
import { useState } from 'react';

export function LocationSelector() {
  const { regions, loading, error, getProvincesByRegion } = usePhLocation();
  const [selectedRegion, setSelectedRegion] = useState('');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
      {regions.map(r => (
        <option key={r.region_code} value={r.region_code}>
          {r.region_name}
        </option>
      ))}
    </select>
  );
}
```

### Create React App

1. Install:
```bash
npm install @joemark0008/use-ph-location
```

2. Use in your component:
```tsx
import { usePhLocation } from '@joemark0008/use-ph-location';

function App() {
  const { regions, loading } = usePhLocation();
  
  if (loading) return <p>Loading...</p>;
  
  return (
    // Your component
  );
}
```

### Vite Project

1. Install:
```bash
npm install use-ph-location
```

2. The hook works out of the box with Vite

## Troubleshooting

### Module not found error

Make sure the package is installed:
```bash
npm ls use-ph-location
```

### Data not loading

Check that the data files are included in your bundle. They should be in the `data/` directory.

### TypeScript errors

Ensure `skipLibCheck` is set to `true` or update your TypeScript version:

```json
{
  "compilerOptions": {
    "skipLibCheck": true
  }
}
```

### Performance issues

The hook caches all data in component state. For large lists, consider using React virtualization libraries like `react-window` or `react-virtualized`.

## Next Steps

- Check out [examples](./examples/) for more detailed usage patterns
- Read the [README](./README.md) for complete API documentation
- Browse [GitHub Issues](https://github.com/yourusername/use-ph-location/issues) for Q&A

## Support

If you encounter any issues:

1. Check the [FAQ section](#faq) below
2. Open an issue on [GitHub](https://github.com/yourusername/use-ph-location/issues)
3. Check existing issues for similar problems

## FAQ

**Q: Can I use this with a static site generator?**
A: Yes, but you'll need to fetch data at build time or use client-side fetching.

**Q: Can I customize the data?**
A: Yes, you can pass `useLocalData: false` and provide your own data source endpoint.

**Q: Is the data up to date?**
A: The data is sourced from the Philippine addresses repository. Check their repository for the latest updates.

**Q: Can I contribute to the data?**
A: Data updates should be contributed to the source repository at isaacs-darcilla/philippine-addresses
