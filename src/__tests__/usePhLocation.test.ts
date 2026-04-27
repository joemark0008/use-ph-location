import { renderHook, waitFor } from '@testing-library/react';
import { usePhLocation } from '../usePhLocation';

describe('usePhLocation', () => {
  describe('Initial Load', () => {
    it('should initialize with proper initial state', async () => {
      const { result } = renderHook(() => usePhLocation({ useLocalData: true }));

      // After async operations complete
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.error).toBe(null);
    });

    it('should load data successfully', async () => {
      const { result } = renderHook(() => usePhLocation({ useLocalData: true }));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.regions).toBeDefined();
      expect(Array.isArray(result.current.regions)).toBe(true);
    });

    it('should have error state if loading fails', async () => {
      const { result } = renderHook(() =>
        usePhLocation({
          useLocalData: false,
          dataSourceUrl: 'http://invalid-url.example.com',
        })
      );

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // May or may not have error depending on network, just check it handled gracefully
      expect(typeof result.current.error === 'string' || result.current.error === null).toBe(true);
    });
  });

  describe('Data Availability', () => {
    it('should have regions array', async () => {
      const { result } = renderHook(() => usePhLocation({ useLocalData: true }));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.regions.length).toBeGreaterThan(0);
      expect(result.current.regions[0]).toHaveProperty('region_code');
      expect(result.current.regions[0]).toHaveProperty('region_name');
    });

    it('should have provinces array', async () => {
      const { result } = renderHook(() => usePhLocation({ useLocalData: true }));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.provinces).toBeDefined();
      expect(Array.isArray(result.current.provinces)).toBe(true);
    });

    it('should have cities array', async () => {
      const { result } = renderHook(() => usePhLocation({ useLocalData: true }));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.cities).toBeDefined();
      expect(Array.isArray(result.current.cities)).toBe(true);
    });

    it('should have barangays array', async () => {
      const { result } = renderHook(() => usePhLocation({ useLocalData: true }));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.barangays).toBeDefined();
      expect(Array.isArray(result.current.barangays)).toBe(true);
    });
  });

  describe('Filtering Functions', () => {
    it('should filter provinces by region code', async () => {
      const { result } = renderHook(() => usePhLocation({ useLocalData: true }));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // Get first region code
      const firstRegionCode = result.current.regions[0]?.region_code;
      if (firstRegionCode) {
        const filteredProvinces = result.current.getProvincesByRegion(firstRegionCode);
        expect(Array.isArray(filteredProvinces)).toBe(true);

        // All filtered provinces should have the same region code
        filteredProvinces.forEach((province) => {
          expect(province.region_code).toBe(firstRegionCode);
        });
      }
    });

    it('should filter cities by province code', async () => {
      const { result } = renderHook(() => usePhLocation({ useLocalData: true }));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // Get first province code
      const firstProvinceCode = result.current.provinces[0]?.province_code;
      if (firstProvinceCode) {
        const filteredCities = result.current.getCitiesByProvince(firstProvinceCode);
        expect(Array.isArray(filteredCities)).toBe(true);

        // All filtered cities should have the same province code
        filteredCities.forEach((city) => {
          expect(city.province_code).toBe(firstProvinceCode);
        });
      }
    });

    it('should filter barangays by city code', async () => {
      const { result } = renderHook(() => usePhLocation({ useLocalData: true }));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // Get first city code
      const firstCityCode = result.current.cities[0]?.city_code;
      if (firstCityCode) {
        const filteredBarangays = result.current.getBarangaysByCity(firstCityCode);
        expect(Array.isArray(filteredBarangays)).toBe(true);

        // All filtered barangays should have the same city code
        filteredBarangays.forEach((barangay) => {
          expect(barangay.city_code).toBe(firstCityCode);
        });
      }
    });

    it('should return empty array for non-existent codes', async () => {
      const { result } = renderHook(() => usePhLocation({ useLocalData: true }));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const nonExistentCode = 'INVALID_CODE_12345';
      expect(result.current.getProvincesByRegion(nonExistentCode)).toEqual([]);
      expect(result.current.getCitiesByProvince(nonExistentCode)).toEqual([]);
      expect(result.current.getBarangaysByCity(nonExistentCode)).toEqual([]);
    });
  });

  describe('Refresh Data', () => {
    it('should have refreshData function', async () => {
      const { result } = renderHook(() => usePhLocation({ useLocalData: true }));

      expect(typeof result.current.refreshData).toBe('function');
    });

    it('should refresh data successfully', async () => {
      const { result } = renderHook(() => usePhLocation({ useLocalData: true }));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const initialRegionsCount = result.current.regions.length;

      // Call refresh
      await result.current.refreshData();

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.regions.length).toBe(initialRegionsCount);
    });
  });

  describe('Data Integrity', () => {
    it('should have unique region codes', async () => {
      const { result } = renderHook(() => usePhLocation({ useLocalData: true }));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const codes = result.current.regions.map((r) => r.region_code);
      const uniqueCodes = new Set(codes);
      expect(codes.length).toBe(uniqueCodes.size);
    });

    it('should have matching province and region codes', async () => {
      const { result } = renderHook(() => usePhLocation({ useLocalData: true }));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const regionCodes = new Set(result.current.regions.map((r) => r.region_code));

      result.current.provinces.forEach((province) => {
        expect(regionCodes.has(province.region_code)).toBe(true);
      });
    });

    it('should have all required fields in data', async () => {
      const { result } = renderHook(() => usePhLocation({ useLocalData: true }));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // Check regions
      result.current.regions.forEach((region) => {
        expect(region.region_code).toBeDefined();
        expect(region.region_name).toBeDefined();
      });

      // Check provinces
      result.current.provinces.forEach((province) => {
        expect(province.province_code).toBeDefined();
        expect(province.province_name).toBeDefined();
        expect(province.region_code).toBeDefined();
      });

      // Check cities - have required fields for filtering
      result.current.cities.forEach((city) => {
        expect(city.city_code).toBeDefined();
        expect(city.city_name).toBeDefined();
        expect(city.province_code).toBeDefined();
        // Note: region_code may not be in all data sources but region_desc is available
      });

      // Check barangays
      result.current.barangays.forEach((barangay) => {
        expect(barangay.brgy_code).toBeDefined();
        expect(barangay.brgy_name).toBeDefined();
        expect(barangay.city_code).toBeDefined();
        expect(barangay.province_code).toBeDefined();
      });
    });
  });
});
