export const baseUrl =
  typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : 'https://ya-praktikum.tech/api/v2';

// Types for import.meta support
interface ImportMeta {
  env: Record<string, string>;
}

interface GlobalWithImportMeta {
  import?: {
    meta?: ImportMeta;
  };
}

// Safely get Vite environment variable with fallback for Jest
const getViteEnvVar = (varName: string): string => {
  // Check if we're in a browser environment with import.meta
  if (typeof window !== 'undefined' && 'import' in globalThis) {
    const globalImport = (globalThis as GlobalWithImportMeta).import;
    if (globalImport?.meta?.env) {
      return globalImport.meta.env[varName] || '';
    }
  }
  // Fallback for Node.js/Jest environment
  return process.env[varName] || '';
};

export const baseUrlAPI_dev =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/v1'
    : `https://${getViteEnvVar('VITE_APP_DOMAIN')}/api/v1`;
