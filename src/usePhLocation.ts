import { useState, useEffect, useCallback } from 'react';
import {
  Region,
  Province,
  City,
  Barangay,
  UsePhLocationReturn,
  UsePhLocationConfig,
} from './types';

// Local JSON data imports
import regionsData from './data/regions.json';
import provincesData from './data/provinces.json';
import citiesData from './data/cities.json';
import barangaysData from './data/barangays.json';

/**
 * Custom React hook for managing Philippine location data
 * Supports region, province, city, and barangay selection with hierarchical filtering
 *
 * @param config - Configuration object for data loading options
 * @returns Object containing location data and utility functions
 *
 * @example
 * ```tsx
 * const { regions, provinces, loading, getProvincesByRegion } = usePhLocation();
 *
 * return (
 *   <select onChange={(e) => setProvinces(getProvincesByRegion(e.target.value))}>
 *     {regions.map(r => <option key={r.region_code}>{r.region_name}</option>)}
 *   </select>
 * );
 * ```
 */
export function usePhLocation(config?: UsePhLocationConfig): UsePhLocationReturn {
  const [regions, setRegions] = useState<Region[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [barangays, setBarangays] = useState<Barangay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    dataSourceUrl = 'https://isaacdarcilla.github.io/philippine-addresses',
    useLocalData = true,
  } = config || {};

  /**
   * Fetch data from remote source
   */
  const fetchRemoteData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [regionsRes, provincesRes, citiesRes, barangaysRes] = await Promise.all([
        fetch(`${dataSourceUrl}/region.json`),
        fetch(`${dataSourceUrl}/province.json`),
        fetch(`${dataSourceUrl}/city.json`),
        fetch(`${dataSourceUrl}/barangay.json`),
      ]);

      if (!regionsRes.ok || !provincesRes.ok || !citiesRes.ok || !barangaysRes.ok) {
        throw new Error('Failed to fetch location data');
      }

      const [regionsData, provincesData, citiesData, barangaysData] = await Promise.all([
        regionsRes.json(),
        provincesRes.json(),
        citiesRes.json(),
        barangaysRes.json(),
      ]);

      setRegions(regionsData);
      setProvinces(provincesData);
      setCities(citiesData);
      setBarangays(barangaysData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error fetching location data:', err);
    } finally {
      setLoading(false);
    }
  }, [dataSourceUrl]);

  /**
   * Load data from local JSON files
   */
  const loadLocalData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Data is already imported at the top
      setRegions(regionsData as unknown as Region[]);
      setProvinces(provincesData as unknown as Province[]);
      setCities(citiesData as unknown as City[]);
      setBarangays(barangaysData as unknown as Barangay[]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error loading local data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Refresh data based on configuration
   */
  const refreshData = useCallback(async () => {
    if (useLocalData) {
      await loadLocalData();
    } else {
      await fetchRemoteData();
    }
  }, [useLocalData, loadLocalData, fetchRemoteData]);

  /**
   * Initialize data on mount
   */
  useEffect(() => {
    refreshData();
  }, []);

  /**
   * Get provinces filtered by region code
   */
  const getProvincesByRegion = useCallback(
    (regionCode: string): Province[] => {
      return provinces.filter((p) => p.region_code === regionCode);
    },
    [provinces]
  );

  /**
   * Get cities filtered by province code
   */
  const getCitiesByProvince = useCallback(
    (provinceCode: string): City[] => {
      return cities.filter((c) => c.province_code === provinceCode);
    },
    [cities]
  );

  /**
   * Get barangays filtered by city code
   */
  const getBarangaysByCity = useCallback(
    (cityCode: string): Barangay[] => {
      return barangays.filter((b) => b.city_code === cityCode);
    },
    [barangays]
  );

  return {
    regions,
    provinces,
    cities,
    barangays,
    loading,
    error,
    getProvincesByRegion,
    getCitiesByProvince,
    getBarangaysByCity,
    refreshData,
  };
}
