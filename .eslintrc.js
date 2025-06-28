module.exports = {
  env: {
    node: true,
    es2020: true
  },
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    'indent': ['error', 2],
    'linebreak-style': 'off',
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'no-unused-vars': ['warn'],
    'no-console': 'off',
    'prefer-const': 'error',
    'no-var': 'error'
  },
  ignorePatterns: [
    'node_modules/',
    '.npm-cache/',
    '*.min.js',
    'example-usage/',
    'example.js',
    'demo.js',
    'test.js'
  ]
}; 