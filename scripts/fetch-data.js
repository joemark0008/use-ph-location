#!/usr/bin/env node

/**
 * Script to fetch complete Philippine location data from remote source
 * and populate local JSON files
 * 
 * Usage: node scripts/fetch-data.js
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://isaacdarcilla.github.io/philippine-addresses';

const DATA_FILES = {
  regions: `${BASE_URL}/region.json`,
  provinces: `${BASE_URL}/province.json`,
  cities: `${BASE_URL}/city.json`,
  barangays: `${BASE_URL}/barangay.json`,
};

const DATA_DIR = path.join(__dirname, '../data');

/**
 * Fetch data from remote source
 */
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error.message);
    throw error;
  }
}

/**
 * Save data to JSON file
 */
function saveData(filename, data) {
  const filePath = path.join(DATA_DIR, `${filename}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`✅ Saved ${filename}.json (${data.length} records)`);
}

/**
 * Main function
 */
async function main() {
  console.log('🔄 Fetching complete Philippine location data...\n');

  try {
    // Ensure data directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    // Fetch all data files
    for (const [name, url] of Object.entries(DATA_FILES)) {
      console.log(`📥 Fetching ${name}...`);
      const data = await fetchData(url);
      saveData(name, data);
    }

    console.log('\n✨ Complete! All data files have been updated.\n');
    console.log('Summary:');
    console.log('--------');
    for (const [name, _] of Object.entries(DATA_FILES)) {
      const filePath = path.join(DATA_DIR, `${name}.json`);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      console.log(`${name}: ${data.length} records`);
    }
  } catch (error) {
    console.error('\n❌ Error fetching data:', error.message);
    process.exit(1);
  }
}

// Run if this is the main module
if (require.main === module) {
  main();
}

module.exports = { fetchData, saveData };
