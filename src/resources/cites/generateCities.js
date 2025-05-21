// generateCities.js (ES-модуль)
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Щоб отримати __dirname в ES-модулях:
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Зчитування JSON
const inputPath = join(__dirname, 'citiesList.json');
const rawData = readFileSync(inputPath, 'utf-8');
const cities = JSON.parse(rawData);

// Мапимо потрібні поля
const simplifiedCities = cities.map((city) => ({
  id: city.id,
  country: city.country,
  nameUa: city.nameUa,
}));

// Генеруємо TypeScript контент
const tsContent = `export const citiesList = ${JSON.stringify(
  simplifiedCities,
  null,
  2
)} as const;\n`;

const outputPath = join(__dirname, 'citiesList.ts');
writeFileSync(outputPath, tsContent, 'utf-8');

console.log('✅ Створено файл citiesList.ts');
