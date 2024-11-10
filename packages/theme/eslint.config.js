// eslint.config.js
import eslintPluginVue from 'eslint-plugin-vue';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
  {
    ignores: ['node_modules/**'],
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: typescriptParser,
      globals: {
        browser: true,
        node: true,
        es2021: true,
      },
    },
    plugins: {
      vue: eslintPluginVue,
      '@typescript-eslint': typescriptEslintPlugin,
      prettier: eslintPluginPrettier,
    },
    rules: {
      ...eslintPluginVue.configs['vue3-essential'].rules,
      ...typescriptEslintPlugin.configs.recommended.rules,
      ...eslintPluginPrettier.configs.recommended.rules,
    },
  },
];
