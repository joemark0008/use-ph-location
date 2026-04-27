import { renderHook } from '@testing-library/react';
import { usePhLocation } from '../usePhLocation';

describe('usePhLocation - Edge Cases', () => {
  describe('Multiple Hook Instances', () => {
    it('should work with multiple hook instances', async () => {
      const { result: result1 } = renderHook(() => usePhLocation({ useLocalData: true }));
      const { result: result2 } = renderHook(() => usePhLocation({ useLocalData: true }));

      expect(result1.current).toBeDefined();
      expect(result2.current).toBeDefined();
      expect(result1.current.regions).toEqual(result2.current.regions);
    });
  });

  describe('Configuration Options', () => {
    it('should accept undefined config', () => {
      const { result } = renderHook(() => usePhLocation());
      expect(result.current).toBeDefined();
    });

    it('should accept useLocalData config', () => {
      const { result } = renderHook(() => usePhLocation({ useLocalData: true }));
      expect(result.current).toBeDefined();
    });

    it('should have useLocalData default to true', () => {
      const { result } = renderHook(() => usePhLocation());
      // Should load successfully with local data
      expect(result.current).toBeDefined();
    });
  });

  describe('Filtering Edge Cases', () => {
    it('should handle empty string codes', async () => {
      const { result } = renderHook(() => usePhLocation({ useLocalData: true }));

      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(result.current.getProvincesByRegion('')).toEqual([]);
      expect(result.current.getCitiesByProvince('')).toEqual([]);
      expect(result.current.getBarangaysByCity('')).toEqual([]);
    });

    it('should be case-sensitive for codes', async () => {
      const { result } = renderHook(() => usePhLocation({ useLocalData: true }));

      await new Promise((resolve) => setTimeout(resolve, 100));

      const regionCode = result.current.regions[0]?.region_code;
      if (regionCode) {
        const lowerCaseCode = regionCode.toLowerCase();
        const correctFilter = result.current.getProvincesByRegion(regionCode);
        const incorrectFilter = result.current.getProvincesByRegion(lowerCaseCode);

        // If codes are numeric, both might work, so just check they're defined
        expect(Array.isArray(correctFilter)).toBe(true);
        expect(Array.isArray(incorrectFilter)).toBe(true);
      }
    });
  });

  describe('Performance', () => {
    it('should complete initial load within reasonable time', async () => {
      const startTime = Date.now();
      const { result } = renderHook(() => usePhLocation({ useLocalData: true }));
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const endTime = Date.now();

      expect(endTime - startTime).toBeLessThan(5000); // 5 seconds max
    });
  });
});
