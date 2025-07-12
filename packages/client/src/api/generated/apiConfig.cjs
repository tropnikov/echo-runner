const config = {
  schemaFile: '../openapiSchema.json',
  apiFile: '../../redux/api.ts',
  apiImport: 'api',
  outputFile: './index.ts',
  exportName: 'api',
  hooks: { queries: true, lazyQueries: true, mutations: true },
};

module.exports = config;
