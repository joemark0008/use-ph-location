# Updating to Complete Philippine Location Data

## Issue

The default JSON files contain **sample data only** for demonstration purposes. The package supports over **42,000 barangays** but only includes a minimal subset by default.

## Complete Data Statistics

The full Philippine administrative divisions dataset includes:

- **13 Regions**
- **81 Provinces** (including National Capital Region)
- **1,634+ Cities & Municipalities**
- **42,028+ Barangays** (one of the highest in the world!)

## Solution

### Method 1: Automatic Download (Recommended)

Run this command to fetch and populate all data files with complete Philippine location data:

```bash
npm run fetch-data
```

or

```bash
npm run update-data
```

This will:
1. Download complete data from the remote source
2. Update all JSON files in the `data/` directory
3. Show you the record count for each file

**Output Example:**
```
🔄 Fetching complete Philippine location data...

📥 Fetching regions...
✅ Saved regions.json (13 records)

📥 Fetching provinces...
✅ Saved provinces.json (81 records)

📥 Fetching cities...
✅ Saved cities.json (1634 records)

📥 Fetching barangays...
✅ Saved barangays.json (42028 records)

✨ Complete! All data files have been updated.
```

### Method 2: Manual Download

Fetch data from the remote API and save to your local files:

```bash
# Download each file individually
curl https://isaacdarcilla.github.io/philippine-addresses/region.json > data/regions.json
curl https://isaacdarcilla.github.io/philippine-addresses/province.json > data/provinces.json
curl https://isaacdarcilla.github.io/philippine-addresses/city.json > data/cities.json
curl https://isaacdarcilla.github.io/philippine-addresses/barangay.json > data/barangays.json
```

### Method 3: Keep Remote Data Source

If you don't want to bundle complete data locally, use the remote API:

```tsx
// Use remote data source instead of local files
const { regions, provinces, cities, barangays } = usePhLocation({
  useLocalData: false,
  dataSourceUrl: 'https://isaacdarcilla.github.io/philippine-addresses'
});
```

**Pros:**
- Smaller package size
- Always up-to-date data
- No need to update JSON files

**Cons:**
- Requires internet connection
- Slower initial load
- Network dependency

## After Updating Data

### 1. Verify the Update

```bash
# Check file sizes
ls -lh data/

# Show record counts
node -e "console.log(JSON.parse(require('fs').readFileSync('./data/barangays.json')).length + ' barangays loaded')"
```

### 2. Test the Hook

```tsx
import { usePhLocation } from 'use-ph-location';

function TestData() {
  const { regions, provinces, cities, barangays, loading } = usePhLocation();
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      <p>Regions: {regions.length}</p>
      <p>Provinces: {provinces.length}</p>
      <p>Cities: {cities.length}</p>
      <p>Barangays: {barangays.length}</p>
    </div>
  );
}
```

Expected output:
```
Regions: 13
Provinces: 81
Cities: 1634
Barangays: 42028
```

### 3. Rebuild and Test

```bash
# Clean and build
npm run clean
npm run build

# Test with your application
npm link
```

## File Sizes After Update

Approximate sizes with complete data:

| File | Size | Records |
|------|------|---------|
| regions.json | ~1 KB | 13 |
| provinces.json | ~5 KB | 81 |
| cities.json | ~80 KB | 1,634 |
| barangays.json | ~2.5 MB | 42,028 |
| **Total** | **~2.6 MB** | **43,756** |

## Data Source

All data is sourced from:
- **Repository:** https://github.com/isaacs-darcilla/philippine-addresses
- **Data URL:** https://isaacdarcilla.github.io/philippine-addresses

## Performance with Large Dataset

With 42,000+ barangays, consider these optimization tips:

### 1. Use React Virtualization
For large dropdowns, use `react-window` or `react-virtualized`:

```tsx
import { FixedSizeList } from 'react-window';

// Use virtualized list instead of rendering all options
<FixedSizeList height={300} itemCount={barangays.length} itemSize={35}>
  {({ index, style }) => (
    <option style={style} value={barangays[index].brgy_code}>
      {barangays[index].brgy_name}
    </option>
  )}
</FixedSizeList>
```

### 2. Use Autocomplete/Search
Filter barangays with search instead of showing all:

```tsx
const [search, setSearch] = useState('');

const filteredBarangays = barangays.filter(b =>
  b.brgy_name.toLowerCase().includes(search.toLowerCase())
);
```

### 3. Lazy Load Data
Load barangays only when city is selected:

```tsx
const barangayList = selectedCity 
  ? getBarangaysByCity(selectedCity) 
  : [];
```

## Troubleshooting

### Script not working

```bash
# Ensure Node.js is installed
node --version

# Try running directly
node scripts/fetch-data.js

# Check for network issues
curl https://isaacdarcilla.github.io/philippine-addresses/region.json
```

### Files not updating

```bash
# Check file permissions
ls -la data/

# Manually remove old files
rm -f data/*.json

# Run fetch script again
npm run fetch-data
```

### Package too large

If bundled data is too large:

1. Use remote data source (recommended)
2. Split data files by region
3. Compress with gzip before bundling

## Custom Data

To use custom data:

1. Create your own JSON files in `data/`
2. Ensure same structure as reference files
3. Run `npm run build`
4. Hook will use local files automatically

## Publishing to NPM

After updating data:

```bash
# Bump version
npm version minor

# Build
npm run build

# Publish
npm publish
```

## Questions?

- Check the source repository: https://github.com/isaacs-darcilla/philippine-addresses
- Open an issue on GitHub
- Check data completeness: https://psgc.gov.ph/ (Philippine Statistics Authority)

---

**Your package now has complete Philippine location data! 🇵🇭**
