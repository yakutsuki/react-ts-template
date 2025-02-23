import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import pluginPromise from 'eslint-plugin-promise';
import tsParser from '@typescript-eslint/parser';

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'build'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
      pluginPromise.configs['flat/recommended'],
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tsParser,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      react: reactPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules, // 使用react-hooks推荐规则
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }], // 警告只导出常量组件
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ], // 使用prettier格式化
      'no-use-before-define': 'warn', // 允许在定义之前使用变量
      'no-unused-vars': 'warn', // 允许未使用的变量
      'import/no-unresolved': 'off', // 允许未解析的导入
      'import/no-duplicates': 'error', // 不允许重复导入
      'import/extensions': 'off', // 允许导入扩展名
      'react/display-name': 'off', // 允许显示名称
      'react/prop-types': 'off', // 允许属性类型
      'jsx-quotes': 'off', // 允许JSX中的引号
      'max-len': 'off', // 允许最大长度
      'no-console': 'warn', // 警告console
      'no-debugger': 'warn', // 警告debugger
    },
  },
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
);
