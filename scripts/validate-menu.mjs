import { readFile } from 'node:fs/promises';
import { access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const menuFiles = ['public/data/menu.json', 'public/data/menu-en.json'];

async function readMenu(relativePath) {
  const absolutePath = path.join(projectRoot, relativePath);
  const parsed = JSON.parse(await readFile(absolutePath, 'utf8'));

  if (!parsed.restaurant || !Array.isArray(parsed.restaurant.categories)) {
    throw new Error(`${relativePath}: invalid restaurant or categories structure`);
  }

  return parsed.restaurant;
}

async function validateMenu(relativePath, menu) {
  const categoryIds = new Set();
  const itemIds = new Set();

  for (const category of menu.categories) {
    if (categoryIds.has(category.id)) throw new Error(`${relativePath}: duplicate category id ${category.id}`);
    categoryIds.add(category.id);

    if (!category.name || !Array.isArray(category.items)) {
      throw new Error(`${relativePath}: invalid category ${category.id}`);
    }

    for (const item of category.items) {
      if (itemIds.has(item.id)) throw new Error(`${relativePath}: duplicate item id ${item.id}`);
      itemIds.add(item.id);

      if (!item.name || (typeof item.price !== 'number' && typeof item.price !== 'string')) {
        throw new Error(`${relativePath}: invalid item ${item.id}`);
      }

      if (item.image !== null) {
        if (typeof item.image !== 'string' || item.image.includes('..') || path.isAbsolute(item.image)) {
          throw new Error(`${relativePath}: unsafe image path for item ${item.id}`);
        }

        await access(path.join(projectRoot, 'public', item.image));
      }
    }
  }

  return { categoryIds: [...categoryIds], itemIds: [...itemIds] };
}

const menus = await Promise.all(menuFiles.map(readMenu));
const results = await Promise.all(menus.map((menu, index) => validateMenu(menuFiles[index], menu)));

if (JSON.stringify(results[0].categoryIds) !== JSON.stringify(results[1].categoryIds)) {
  throw new Error('Arabic and English category IDs are not aligned');
}

if (JSON.stringify(results[0].itemIds) !== JSON.stringify(results[1].itemIds)) {
  throw new Error('Arabic and English item IDs are not aligned');
}

process.stdout.write(
  `Menu validation passed: ${results[0].categoryIds.length} categories, ${results[0].itemIds.length} items.\n`
);
