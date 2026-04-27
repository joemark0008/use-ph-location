/**
 * Represents a Philippine region
 */
export interface Region {
  region_code: string;
  region_name: string;
}

/**
 * Represents a Philippine province
 */
export interface Province {
  province_code: string;
  province_name: string;
  region_code: string;
}

/**
 * Represents a Philippine city/municipality
 */
export interface City {
  city_code: string;
  city_name: string;
  province_code: string;
  region_code: string;
}

/**
 * Represents a Philippine barangay
 */
export interface Barangay {
  brgy_code: string;
  brgy_name: string;
  city_code: string;
  province_code: string;
  region_code: string;
}

/**
 * Configuration for the hook data loading
 */
export interface UsePhLocationConfig {
  dataSourceUrl?: string;
  useLocalData?: boolean;
}

/**
 * Return type for usePhLocation hook
 */
export interface UsePhLocationReturn {
  regions: Region[];
  provinces: Province[];
  cities: City[];
  barangays: Barangay[];
  loading: boolean;
  error: string | null;
  getProvincesByRegion: (regionCode: string) => Province[];
  getCitiesByProvince: (provinceCode: string) => City[];
  getBarangaysByCity: (cityCode: string) => Barangay[];
  refreshData: () => Promise<void>;
}

/**
 * Raw data structure for barangay (with city_code instead of city_name)
 */
export interface BarangayRaw {
  brgy_code: string;
  brgy_name: string;
  city_code: string;
  province_code: string;
  region_code: string;
}

/**
 * Raw data structure for city
 */
export interface CityRaw {
  city_code: string;
  city_name: string;
  province_code: string;
  region_code: string;
}

/**
 * Raw data structure for province
 */
export interface ProvinceRaw {
  province_code: string;
  province_name: string;
  region_code: string;
}

/**
 * Raw data structure for region
 */
export interface RegionRaw {
  region_code: string;
  region_name: string;
}
