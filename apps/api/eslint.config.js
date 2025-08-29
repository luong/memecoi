import js from '@eslint/js'
import tseslint from 'typescript-eslint'

export default [
  {
    ignores: ['node_modules/**', 'build/**', 'dist/**', 'tmp/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['**/*.{ts,js}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        process: 'readonly',
        __dirname: 'readonly',
        module: 'readonly',
        require: 'readonly',
      },
    },
    rules: {
      'no-undef': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
]
