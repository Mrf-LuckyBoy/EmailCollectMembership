import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'

export default [
  // ✅ Ignore non-source files
  {
    ignores: [
      'node_modules',
      'dist',
      'coverage',
      'prisma/migrations',
      'eslint.config.js', // prevent self-linting
    ],
  },

  // Base JS rules
  js.configs.recommended,

  // TypeScript rules (basic)
  ...tseslint.configs.recommended,

  // ✅ Type-aware rules (important)
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      'no-console': 'off',
      'no-unused-vars': 'off',

      '@typescript-eslint/no-unused-vars': 'warn',

      // These require type information
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
    },
  },

  {
    files: ['**/*.spec.ts', '**/*.test.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
    },
  },

  prettier,
]
