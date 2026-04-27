# Testing Guide for usePhLocation

## Installation

First, install test dependencies:

```bash
npm install
```

This will install Jest, React Testing Library, and TypeScript testing utilities.

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode (re-runs when files change)
```bash
npm test -- --watch
```

### Run tests with coverage report
```bash
npm test -- --coverage
```

### Run specific test file
```bash
npm test -- usePhLocation.test.ts
```

### Run tests matching a pattern
```bash
npm test -- --testNamePattern="should filter provinces"
```

## Test Coverage

The test suite includes:

### ✅ Basic Tests (`usePhLocation.test.ts`)
- Initial load state
- Data loading success
- Error handling
- Data availability (regions, provinces, cities, barangays)
- Filtering functions
- Data refresh
- Data integrity

### ✅ Edge Cases (`usePhLocation.edge.test.ts`)
- Multiple hook instances
- Configuration options
- Empty/invalid codes
- Case sensitivity
- Performance benchmarks

## Test File Structure

```
src/
├── __tests__/
│   ├── setup.ts                          # Test environment setup
│   ├── __mocks__/
│   │   └── fileMock.js                   # Mock for JSON imports
│   ├── usePhLocation.test.ts             # Main tests
│   └── usePhLocation.edge.test.ts        # Edge case tests
└── usePhLocation.ts                      # Source code
```

## Example Test Output

```
 PASS  src/__tests__/usePhLocation.test.ts
  usePhLocation
    Initial Load
      ✓ should return loading state initially (45ms)
      ✓ should load data successfully (120ms)
    Data Availability
      ✓ should have regions array (5ms)
      ✓ should have provinces array (2ms)
      ✓ should have cities array (2ms)
      ✓ should have barangays array (2ms)
    Filtering Functions
      ✓ should filter provinces by region code (8ms)
      ✓ should filter cities by province code (3ms)
      ✓ should filter barangays by city code (2ms)
      ✓ should return empty array for non-existent codes (1ms)
    Data Integrity
      ✓ should have unique region codes (2ms)
      ✓ should have matching province and region codes (3ms)

Test Suites: 2 passed, 2 total
Tests:       22 passed, 22 total
Coverage:    82% lines, 75% branches, 90% functions
```

## Writing Your Own Tests

### Basic Test Template

```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { usePhLocation } from '../usePhLocation';

describe('usePhLocation - My Feature', () => {
  it('should do something specific', async () => {
    const { result } = renderHook(() => usePhLocation());

    // Wait for loading to complete
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Your assertions here
    expect(result.current.regions.length).toBeGreaterThan(0);
  });
});
```

### Testing with React Testing Library

```typescript
import { render, screen } from '@testing-library/react';
import { usePhLocation } from '../usePhLocation';

// Create a test component
function TestComponent() {
  const { regions, loading } = usePhLocation();
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <select>
      {regions.map(r => (
        <option key={r.region_code}>{r.region_name}</option>
      ))}
    </select>
  );
}

describe('Integration Tests', () => {
  it('should render regions in dropdown', async () => {
    render(<TestComponent />);
    
    // Wait for regions to load and render
    const options = await screen.findAllByRole('option');
    expect(options.length).toBeGreaterThan(1);
  });
});
```

## Common Testing Patterns

### Waiting for Async Operations

```typescript
import { waitFor } from '@testing-library/react';

await waitFor(() => {
  expect(result.current.loading).toBe(false);
}, { timeout: 3000 });
```

### Testing Error Scenarios

```typescript
it('should handle errors', async () => {
  const { result } = renderHook(() =>
    usePhLocation({
      useLocalData: false,
      dataSourceUrl: 'http://invalid.com'
    })
  );

  await waitFor(() => {
    expect(result.current.loading).toBe(false);
  });

  // Check error or fallback behavior
  expect(result.current.error || result.current.regions).toBeDefined();
});
```

### Testing Filtering Logic

```typescript
it('should filter correctly', async () => {
  const { result } = renderHook(() => usePhLocation());

  await waitFor(() => {
    expect(result.current.loading).toBe(false);
  });

  const regionCode = '01';
  const provinces = result.current.getProvincesByRegion(regionCode);

  expect(provinces.every(p => p.region_code === regionCode)).toBe(true);
});
```

## Coverage Goals

Current coverage targets:
- **Lines**: 50%+
- **Branches**: 50%+
- **Functions**: 50%+
- **Statements**: 50%+

Check coverage:
```bash
npm test -- --coverage
```

## Debugging Tests

### Verbose output
```bash
npm test -- --verbose
```

### Debug specific test
```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

Then open `chrome://inspect` in Chrome DevTools.

### Print debug info
```typescript
import { renderHook } from '@testing-library/react';

it('debug test', () => {
  const { result } = renderHook(() => usePhLocation());
  console.log(result.current); // Logs hook result
});
```

## CI/CD Integration

### GitHub Actions Example

Create `.github/workflows/test.yml`:

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm test -- --coverage
      - uses: codecov/codecov-action@v3
```

## Troubleshooting

### Tests timing out

Increase timeout in jest.config.js:
```javascript
testTimeout: 10000 // 10 seconds
```

### Module not found errors

Clear cache:
```bash
npm test -- --clearCache
```

### TypeScript errors in tests

Check tsconfig.json includes test files:
```json
{
  "include": ["src"]
}
```

## Best Practices

✅ **Do:**
- Test behavior, not implementation
- Use descriptive test names
- Keep tests isolated and independent
- Mock external dependencies
- Use async/await with waitFor
- Test both happy paths and errors

❌ **Don't:**
- Test implementation details
- Create dependencies between tests
- Use real network requests
- Skip error scenarios
- Make tests too specific

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Hooks Guide](https://react-hooks-testing-library.com/)

---

Happy testing! 🧪
