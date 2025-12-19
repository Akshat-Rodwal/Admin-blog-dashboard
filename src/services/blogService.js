import { storage, migrateIfNeeded } from './storage';

const SAMPLE_DATA = [
  {
    id: '1',
    title: 'Getting Started with React',
    description: 'Learn the basics of React',
    category: 'Technology',
    author: 'Admin User',
    image: 'https://via.placeholder.com/800x400',
    publishDate: new Date('2023-01-15').toISOString(),
    status: 'published',
    content: 'This is a sample blog post content...',
    deleted: false,
  },
  {
    id: '2',
    title: 'Business Trends 2025',
    description: 'Top business trends to watch',
    category: 'Business',
    author: 'Admin User',
    image: 'https://via.placeholder.com/800x400',
    publishDate: new Date('2025-01-01').toISOString(),
    status: 'draft',
    content: 'Key business insights for the upcoming year...',
    deleted: false,
  },
];

const PURGE_AFTER_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export const blogService = {
  async getAll() {
    migrateIfNeeded();
    const data = storage.getAll();
    if (data && Array.isArray(data)) return data;
    storage.setAll(SAMPLE_DATA);
    return SAMPLE_DATA;
  },

  saveAll(data) {
    storage.setAll(data);
  },

  async purgeDeleted() {
    const data = storage.getAll() || [];
    const now = Date.now();
    const cleaned = data.filter((b) => !(b.deleted && b.deletedAt && now - b.deletedAt > PURGE_AFTER_MS));
    storage.setAll(cleaned);
    return cleaned;
  },
};

