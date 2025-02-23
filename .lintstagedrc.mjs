export default {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{css,scss,less}': ['stylelint --fix', 'prettier --write'],
  '*.{json,yaml,yml}': ['prettier --write'],
  '*.{md,mdx}': ['prettier --write'],
  'package.json': ['prettier --write'],
};
