/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
const config = {
  singleQuote: true,
  bracketSameLine: true,
  trailingComma: 'all',
  tabWidth: 2,
  semi: true,
  printWidth: 120,
  arrowParens: 'always',
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrder: [
    '^react$',
    '^react-dom$',
    '^react/',
    '^react-router-dom',
    '^react-router',
    '',
    '^antd',
    '^@ant-design/',
    '',
    '<BUILTIN_MODULES>',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@/components',
    '^@/pages',
    '^@/helpers',
    '^@/hooks',
    '^@/types',
    '',
    '^@/',
    '',
    '^(?!.*[.]css$)[./].*$',
    '',
    '.css$',
  ],
  overrides: [
    {
      files: '*.mdx',
      options: {
        printWidth: 80,
      },
    },
  ],
};

export default config;
