const js = require('@eslint/js');

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly'
      }
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
    }
  },
  {
    ignores: [
      'node_modules/',
      '.npm-cache/',
      '*.min.js'
    ]
  }
]; 