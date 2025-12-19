const STORAGE_KEY = 'blogs';
const SCHEMA_VERSION_KEY = 'blogs_schema_version';
const CURRENT_VERSION = 1;

// LocalStorage helpers with schema versioning
export const storage = {
  getAll() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  setAll(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },
  getVersion() {
    const v = localStorage.getItem(SCHEMA_VERSION_KEY);
    return v ? Number(v) : 0;
  },
  setVersion(v) {
    localStorage.setItem(SCHEMA_VERSION_KEY, String(v));
  },
};

// Simple schema migration example
export const migrateIfNeeded = () => {
  const current = storage.getVersion();
  if (current >= CURRENT_VERSION) return;
  let data = storage.getAll() || [];
  // Example migration: ensure every record has deleted=false and status
  data = data.map((b) => ({
    deleted: false,
    status: b.status || 'draft',
    ...b,
  }));
  storage.setAll(data);
  storage.setVersion(CURRENT_VERSION);
};

