export default {
  extends: ['stylelint-config-standard'],
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.json', '**/*.md'],
  plugins: ['stylelint-order'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen'],
      },
    ], // 忽略tailwind规则
    'import-notation': null, // 允许导入符号
    'function-no-unknown': null, // 允许未知函数
    'no-empty-source': null, // 允许空源
    'no-descending-specificity': null, // 允许降级特异性
  },
};
